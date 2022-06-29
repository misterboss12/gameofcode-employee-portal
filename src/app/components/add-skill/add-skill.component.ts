import { SkillsComponent } from '../skills/skills.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkillCrudService } from 'src/app/services/skill-crud/skill-crud.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Skill } from 'src/app/models/skill.model';
import { getEmployeeId } from 'src/app/utils/userFunctions';
@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css'],
})
export class AddSkillComponent implements OnInit {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private skillServ: SkillCrudService,
    private auth: AuthService,
    public dialogRef: MatDialogRef<AddSkillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { parent: SkillsComponent }
  ) {
    this.matIconRegistry.addSvgIcon(
      'grade',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/grade-24px.svg')
    );
  }

  public addSkillForm: FormGroup;
  public skillNames: string[] = [
    'Angular',
    'Wordpress',
    'HTML',
    'PHP',
    'CSS',
    'Python',
    'Java',
    'JavaScript',
    'C',
    'C#',
    'C++',
  ];

  private saveNewSkillClick = false;
  skillDescription: String;

  public skillLevels = [
    {
      name: 'Basic',
      dataRank: 1,
      description: 'You have a common knowledge and understanding of basic concepts.',
      experience: 'Experience: Less than 6 months.',
    },
    {
      name: 'Limited',
      dataRank: 2,
      description:
        'You understand and can discuss terminology, concepts, principles and issues related to this competency.',
      experience: 'Experience: 6 - 18 months.',
    },
    {
      name: 'Intermediate',
      dataRank: 3,
      description:
        'You are able to successfully complete tasks in this competency as requested. Help from an expert may be required from time to time, bur you can usually perform the skill independently.',
      experience: 'Experience: 18 - 36 months.',
    },
    {
      name: 'Advanced',
      dataRank: 4,
      description:
        'You can perform the actions associated with this skill without assistance. You are certainly recognized within your immediate organization as "a person to ask" when difficult questions arise regarding this skill.',
      experience: 'Experience: 36 - 60 months.',
    },
    {
      name: 'Expert',
      dataRank: 5,
      description:
        'You are known as an expert in this area. You can provide guidance, troubleshoot and answer questions related to this area of expertise and the field where the skill is used.',
      experience: 'Experience: 60+ months.',
    },
  ];

  public addSkillFromForm() {
    let date_created = new Date();
    const employeeId = getEmployeeId();

    this.addSkillForm.controls.description.setValue(this.skillDescription);
    const newSkill: Skill = {
      employee: employeeId,
      skillname: this.addSkillForm.controls.skillname.value,
      created_at: date_created,
      level: this.addSkillForm.controls.level.value,
      description: this.addSkillForm.controls.description.value,
    };
    this.dialogRef.close(newSkill);
  }

  public saveNewSkill() {
    this.saveNewSkillClick = true;
  }

  public isAddSkillDescription() {
    if (this.saveNewSkillClick) return true;
    else return false;
  }

  public setDescription(description: String) {
    this.skillDescription = description;
  }

  public onSkipClicked() {
    this.skillDescription = '';
  }
  //Code for stars at skill card
  colorStarsPerSkillLevel() {
    if (!this.data.parent.employee) return;

    this.data.parent.employee.skills.forEach((skill) => {
      const card = document.getElementById(`${skill.id}`);
      const stars = Array.from(card.getElementsByClassName('icon-star'));

      for (let i = 0; i < skill.level; i++) {
        stars[i].classList.add('rank');
      }
    });
  }

  ngOnInit() {
    this.addSkillForm = this.formBuilder.group({
      skillname: ['', [Validators.required]],
      level: ['', [Validators.required]],
      description: [''],
    });

    // Don't show already added skills in dropdown
    // Get skills
    this.skillServ.getAllSkills().subscribe((skills) => {
      // Append the incoming skill names to the collection
      this.skillNames = Array.from(new Set([...this.skillNames, ...skills.map((s) => s.skillname)]));
      // Filter out the skills
      this.data.parent.employee.skills.forEach((skill) => {
        if (this.skillNames.includes(skill.skillname)) {
          this.skillNames.splice(this.skillNames.indexOf(skill.skillname), 1);
        }
      });
    });
  }
  //Filter for skill level and stars at add skill form button
  getSkillLevelFilter(event: any) {
    const target = event.target.getAttribute('data-rank');
    this.addSkillForm.controls.level.setValue(parseInt(target));
  }

  deselectAllStars() {
    const stars = document.querySelectorAll('.addSkillForm .icon-star');

    // Remove all star classes
    for (let i = 0; i < stars.length; i++) {
      stars[i].classList.remove('blue-icon');
    }
  }

  selectStars(level: number) {
    const stars = document.querySelectorAll('.addSkillForm .icon-star');

    for (let i = 0; i < level; i++) {
      stars[i].classList.add('blue-icon');
    }
  }

  mouseLeaveStars() {
    const level = this.addSkillForm.controls.level.value;

    this.deselectAllStars();
    this.selectStars(level);
  }

  //Hover stars at add skill form button
  mouseOverStars(event: any) {
    const level = parseInt(event.target.getAttribute('data-rank'));

    this.deselectAllStars();
    this.selectStars(level);
  }
}

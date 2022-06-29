import { SkillsComponent } from '../skills/skills.component';
import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Skill } from 'src/app/models/skill.model';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { getEmployeeId } from 'src/app/utils/userFunctions';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css'],
})
export class EditSkillComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private location: Location,
    public dialogRef: MatDialogRef<EditSkillComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: { skill: Skill; parent: SkillsComponent; openDescriptionBox: boolean }
  ) {
    this.matIconRegistry.addSvgIcon(
      'skill-level-star',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/grade-24px.svg')
    );
  }

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
  skillDescription: String;
  private onUpdateSkillClicked = false;

  editSkillForm = this.formBuilder.group({
    description: [''],
    level: [this.data.skill.level || '', [Validators.required]],
  });

  editSkillFromForm() {
    const employeeId = getEmployeeId();
    const updatedSkill: Skill = {
      id: this.data.skill.id,
      employee: employeeId,
      skillname: this.data.skill.skillname,
      created_at: new Date(this.data.skill.created_at),
      level: this.editSkillForm.controls.level.value,
      description: this.editSkillForm.controls.description.value,
    };
    this.dialogRef.close(updatedSkill);
  }

  getSkill() {
    this.editSkillForm.patchValue({
      id: this.data.skill.id,
      level: this.data.skill.level,
      description: this.data.skill.description,
    });
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getSkill();
    //this.skillDescription = this.data.skill.description;
    this.onUpdateSkillClicked = this.data.openDescriptionBox;
  }

  //Filter for skill level and stars at add skill form button
  getSkillLevelFilter(event: any) {
    const target = event.target.getAttribute('data-rank');
    this.editSkillForm.controls.level.setValue(parseInt(target));
  }

  deselectAllStars() {
    const stars = document.querySelectorAll('.editSkillForm .icon-star');

    // Remove all star classes
    for (let i = 0; i < stars.length; i++) {
      stars[i].classList.remove('blue-icon');
    }
  }

  selectStars(level: number) {
    const stars = document.querySelectorAll('.editSkillForm .icon-star');

    for (let i = 0; i < level; i++) {
      stars[i].classList.add('blue-icon');
    }
  }

  mouseLeaveStars() {
    const level = this.editSkillForm.controls.level.value;

    this.deselectAllStars();
    this.selectStars(level);
  }

  //Hover stars at add skill form button
  mouseOverStars(event: any) {
    const level = parseInt(event.target.getAttribute('data-rank'));

    this.deselectAllStars();
    this.selectStars(level);
  }

  public updateSkill() {
    this.onUpdateSkillClicked = true;
  }

  public isUpdateSkillDescription() {
    if (this.onUpdateSkillClicked) return true;
    else return false;
  }

  public setDescription(description: String) {
    this.editSkillFromForm();
  }
}

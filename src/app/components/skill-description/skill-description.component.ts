import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Skill } from 'src/app/models/skill.model';
import { EditSkillComponent } from '../edit-skill/edit-skill.component';
import { SkillsComponent } from '../skills/skills.component';

@Component({
  selector: 'app-skill-description',
  templateUrl: './skill-description.component.html',
  styleUrls: ['./skill-description.component.css'],
})
export class SkillDescriptionComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { skill: Skill; parent: SkillsComponent; openDescriptionBox: boolean }
  ) {}

  skillDescription = this.data.skill.description;

  openEditDescDialog(skill = this.data.skill) {
    this.dialog.open(EditSkillComponent, {
      width: '850px',
      data: { skill, parent: this, openDescriptionBox: this.data.openDescriptionBox },
    });
  }

  ngOnInit(): void {}
}

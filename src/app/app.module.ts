import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SkillsComponent } from './components/skills/skills.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BooksComponent } from './components/books/books.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ActionDialogComponent } from './components/action-dialog/action-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { BreadcumbToolbarComponent } from './components/breadcumb-toolbar/breadcumb-toolbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConferenceComponent } from './components/conference/conference.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { EditSkillComponent } from './components/edit-skill/edit-skill.component';
import { AddSkillComponent } from './components/add-skill/add-skill.component';
import { SkillDescriptionComponent } from './components/skill-description/skill-description.component';
import { GoogleAuthComponent } from './components/google-auth/google-auth.component';
import { AddConferenceComponent } from '../app/components/conference/add-conference/add-conference.component';
import { EditConferenceComponent } from './components/conference/edit-conference/edit-conference.component';
import { NonWorkingHolidaysComponent } from './components/non-working-holidays/non-working-holidays.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EmployeeEffects } from './effects/employee.effects';
import { employeeReducer } from './reducers/employee.reducers';
import { VacationFormComponent } from './components/vacation-form/vacation-form.component';
import { VacationDaysComponent } from './components/vacation-days/vacation-days.component';
import { VacationCalendarComponent } from './components/vacation-calendar/vacation-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    SkillsComponent,
    BooksComponent,
    NavigationComponent,
    ActionDialogComponent,
    LoginComponent,
    BreadcumbToolbarComponent,
    DashboardComponent,
    ConferenceComponent,
    SettingsComponent,
    ProfilePageComponent,
    EditSkillComponent,
    AddSkillComponent,
    SkillDescriptionComponent,
    GoogleAuthComponent,
    AddConferenceComponent,
    EditConferenceComponent,
    NonWorkingHolidaysComponent,
    VacationFormComponent,
    VacationDaysComponent,
    VacationCalendarComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDialogModule,
    MatMenuModule,
    MatTooltipModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    StoreModule.forRoot({
      employee: employeeReducer,
      conferences: employeeReducer,
      holidays: employeeReducer,
      skills: employeeReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    EffectsModule.forRoot([EmployeeEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

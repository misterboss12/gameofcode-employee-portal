import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { RoutePaths } from './route-paths.enum';
import { BooksComponent } from './components/books/books.component';
import { SkillsComponent } from './components/skills/skills.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConferenceComponent } from './components/conference/conference.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthGuard } from './guard/auth.guard';
import { GoogleAuthComponent } from './components/google-auth/google-auth.component';
import { NonWorkingHolidaysComponent } from './components/non-working-holidays/non-working-holidays.component';
import { VacationFormComponent } from './components/vacation-form/vacation-form.component';
import { VacationDaysComponent } from './components/vacation-days/vacation-days.component';
import { VacationCalendarComponent } from './components/vacation-calendar/vacation-calendar.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: `${RoutePaths.Skills}`,
        pathMatch: 'full',
      },
      {
        path: `${RoutePaths.Skills}`,
        component: SkillsComponent,
      },
      {
        path: `${RoutePaths.Books}`,
        component: BooksComponent,
      },
      {
        path: `${RoutePaths.Conferences}`,
        component: ConferenceComponent,
      },
      {
        path: `${RoutePaths.Settings}`,
        component: SettingsComponent,
      },
      {
        path: `${RoutePaths.NonWorkingHolidays}`,
        component: NonWorkingHolidaysComponent,
      },
      {
        path: `${RoutePaths.VacationForm}`,
        component: VacationFormComponent,
      },
      {
        path: `${RoutePaths.VacationDays}`,
        component: VacationDaysComponent,
      },
      {
        path: `${RoutePaths.VacationCalendar}`,
        component: VacationCalendarComponent,
      },
      
    ],
  },
  {
    path: `${RoutePaths.Login}`,
    component: LoginComponent,
  },
  {
    path: `${RoutePaths.Profile}`,
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: `${RoutePaths.GoogleAuthCallback}`,
    component: GoogleAuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

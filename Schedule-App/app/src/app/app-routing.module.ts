import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MonthComponent } from './components/month/month.component';

const routes: Routes = [
  {path: '',  pathMatch: 'full', redirectTo: 'calendar'},
  {path: 'calendar', component: CalendarComponent},
  {path: 'month', component: MonthComponent},
  {path: '**', component: CalendarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

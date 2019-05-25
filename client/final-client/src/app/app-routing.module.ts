import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginRegComponent } from './login-reg/login-reg.component';
import { NewquizComponent } from './newquiz/newquiz.component';
import { QuestionComponent } from './question/question.component';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { DisplayquestionComponent } from './displayquestion/displayquestion.component';
import { YourscoreComponent } from './yourscore/yourscore.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component:LoginRegComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'newquiz', component:NewquizComponent},
  {path: 'edit', component:DisplayquestionComponent},
  {path: 'yourscore', component:YourscoreComponent},
  {path: 'play', component:QuestionComponent},
  {path: '**', component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


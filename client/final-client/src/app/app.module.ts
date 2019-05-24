import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegComponent } from './login-reg/login-reg.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewquizComponent } from './newquiz/newquiz.component';
import { QuestionComponent } from './question/question.component';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { DisplayquestionComponent } from './displayquestion/displayquestion.component';
import { YourscoreComponent } from './yourscore/yourscore.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegComponent,
    DashboardComponent,
    NewquizComponent,
    QuestionComponent,
    AddquestionComponent,
    DisplayquestionComponent,
    YourscoreComponent,
    NotfoundComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

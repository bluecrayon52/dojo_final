import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-newquiz',
  templateUrl: './newquiz.component.html',
  styleUrls: ['./newquiz.component.css']
})
export class NewquizComponent implements OnInit {
  quizForm: FormGroup;
  quizErrors;
  user;
  constructor(private quiz_api: QuizService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user === null) {
      this.router.navigate([''])
    }

    this.quizForm = this.formBuilder.group({
      quizName: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.setQuizErrors();
  }
  setQuizErrors() {
    this.quizErrors = {
      quizName: ''
    }
  }
  createQuiz(){
    console.log(this.quizForm.controls.quizName.errors);
    this.setQuizErrors();
    if (this.quizForm.invalid) {
      if (this.quizForm.controls.quizName.errors.required){
        this.quizErrors.quizName = "Quiz name required"
      } 
      else if (this.quizForm.controls.quizName.errors.minlength){
        this.quizErrors.quizName = "Quiz name must be at least 5 characters"
      }
      return;
    }
    let body = {user_id: this.user.id, name: this.quizForm.getRawValue().quizName}
    this.quiz_api.createQuiz(body).subscribe(
      resp => {
        console.log(resp);
        this.router.navigate(['/edit/'+resp.id])
      },
      error => {
        console.log(error);
      }
    )
  }
}

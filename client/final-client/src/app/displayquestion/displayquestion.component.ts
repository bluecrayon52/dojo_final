import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-displayquestion',
  templateUrl: './displayquestion.component.html',
  styleUrls: ['./displayquestion.component.css']
})
export class DisplayquestionComponent implements OnInit {
  quiz;
  user;
  constructor(private activatedRoute: ActivatedRoute, private quiz_api: QuizService, private router: Router) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user === null) {
      this.router.navigate([''])
    }
    this.quiz = JSON.parse(localStorage.getItem('currentQuiz'));
    // this.getQuiz();
  }

  getQuiz() {
    let body = {quiz_id: this.quiz.id, user_id: this.user.id}
    this.quiz_api.getQuiz(body).subscribe(
      resp => {
        this.quiz = resp
        console.log(resp)
      },
      error => {
        console.log(error)
      }
    )
  }

  onDelete(question) {
    if (this.quiz.created_by.id != this.user.id) {
      return;
    }
    let body = {question_id: question.id, user_id: this.user.id}
    console.log(body);
    this.quiz_api.deleteQuestion(body).subscribe(
      resp => {
        console.log(resp);
        this.getQuiz();
      },
      error => {
        console.log(error);
      }
    )
  } 
}

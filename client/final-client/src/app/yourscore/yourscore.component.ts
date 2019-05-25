import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-yourscore',
  templateUrl: './yourscore.component.html',
  styleUrls: ['./yourscore.component.css']
})
export class YourscoreComponent implements OnInit {
  score: number;
  user;
  quiz;
  constructor(private quiz_api: QuizService) { }

  ngOnInit() {
    this.score = JSON.parse(localStorage.getItem('currentScore'));
    this.quiz = JSON.parse(localStorage.getItem('currentQuiz'));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  saveScore(){
    let body = { quiz_id: this.quiz.id, user_id: this.user.id, value: this.score }
    this.quiz_api.saveScore(body).subscribe(
      resp => {
        console.log(resp);
      },
      error  => {
        console.log(error);
      }
    );
  }
}

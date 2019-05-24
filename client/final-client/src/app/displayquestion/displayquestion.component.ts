import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-displayquestion',
  templateUrl: './displayquestion.component.html',
  styleUrls: ['./displayquestion.component.css']
})
export class DisplayquestionComponent implements OnInit {
  quizid:number;
  quiz;
  user;
  constructor(private route:ActivatedRoute, private quiz_api:QuizService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.quizid = +this.route.snapshot.paramMap.get('quizid')
    this.getQuiz()
  }
  getQuiz() {
    let body = {quiz_id: this.quizid, user_id: this.user.id}
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
}

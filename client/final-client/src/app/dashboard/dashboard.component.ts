import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  quizzes;
  user = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private quiz_api: QuizService) {
    this.getquizzes();
  }
    
  ngOnInit() {
  }
  getquizzes(){
    this.quiz_api.getAllQuizzes(this.user.id).subscribe(
      data => {
        this.quizzes = data;
      },
      error=>{
        console.log(error);
      }
    )
  }
}

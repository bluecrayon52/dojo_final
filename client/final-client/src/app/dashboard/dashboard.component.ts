import { Component, OnInit} from '@angular/core';
import { QuizService } from '../quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  quizzes;
  user;
  constructor(private quiz_api: QuizService, private router: Router) {}
    
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user === null) {
      this.router.navigate([''])
    }
    this.getQuizzes();
  }

  setQuiz(quiz) {
    localStorage.setItem('currentQuiz', JSON.stringify(quiz));
  }

  getQuizzes(){
    this.quiz_api.getAllQuizzes(this.user.id).subscribe(
      data => {
        this.quizzes = data;
        // console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
  }

  onDelete(quiz) {
    if(quiz.created_by.id != this.user.id) {
      return;
    }
    let body = { quiz_id: quiz.id, user_id: this.user.id }
    this.quiz_api.deleteQuiz(body).subscribe(
      data => {
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
  }
}

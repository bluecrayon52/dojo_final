import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-yourscore',
  templateUrl: './yourscore.component.html',
  styleUrls: ['./yourscore.component.css']
})
export class YourscoreComponent implements OnInit {
  score: number;
  user;
  quiz;
  constructor() { }

  ngOnInit() {
    this.score = JSON.parse(localStorage.getItem('currentScore'));
    this.quiz = JSON.parse(localStorage.getItem('currentQuiz'));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

}

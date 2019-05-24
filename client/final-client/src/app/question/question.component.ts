import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  quizid:number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.quizid = +this.route.snapshot.paramMap.get('quizid')
  }

}

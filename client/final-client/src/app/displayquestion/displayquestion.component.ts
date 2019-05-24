import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-displayquestion',
  templateUrl: './displayquestion.component.html',
  styleUrls: ['./displayquestion.component.css']
})
export class DisplayquestionComponent implements OnInit {
  quizid:number;
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.quizid = +this.route.snapshot.paramMap.get('quizid')
  }

}

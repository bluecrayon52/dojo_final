import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  answerForm: FormGroup;
  questionErrors;
  quiz;
  user;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user === null) {
      this.router.navigate([''])
    }
    this.quiz = JSON.parse(localStorage.getItem('currentQuiz'));
    let controllers ={};
    for(let question of this.quiz.questions) {
      for (let answer of question.answers) {
        let id = answer.id;
        controllers["answer_"+id] = ['']
      }
    }
    // console.log(controllers);
    this.answerForm = this.formBuilder.group(controllers);
    this.setQuestionErrors();
  }

  setQuestionErrors() {
    let errors ={};
    for(let question of this.quiz.questions) {
      let id = question.id;
      errors["question_"+id] = "";
      }
    // console.log(errors);
    this.questionErrors = errors;
  }

  setAnswer(question, answer_id){
    console.log("select answer: ", answer_id);
    for (let answer of question.answers) {
      if (answer.id != answer_id) {
        console.log("unselect answer: ", answer.id);
        this.answerForm.controls['answer_'+answer.id].reset();
        this.answerForm.controls['answer_'+answer.id].setValue(false);
      }
    }
  }

  gradeQuiz() {
    this.setQuestionErrors();
    let errors = false;
    let form = this.answerForm.getRawValue();
    let correct = 0;
    for(let question of this.quiz.questions) {
      let count = 0;
      for (let answer of question.answers) { 
        if (!form["answer_"+answer.id]) {
          count++;
        } else if (answer.correct) {
          correct++;
        }
      }
      if (count == question.answers.length) {
        errors = true;
        this.questionErrors["question_"+question.id] = 'please select an answer'
      }
    }
    if (errors) {
      console.log(this.questionErrors);
      return;
    }
    localStorage.setItem('currentScore', JSON.stringify(correct));
    // console.log(JSON.parse(localStorage.getItem('currentScore')))
    this.router.navigate(["/yourscore"])
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { QuizService } from './../quiz.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {
  @Input() quiz;
  questionForm: FormGroup;
  questionErrors;
  user;
  constructor(private quiz_api: QuizService, private formBuilder: FormBuilder, private router: Router) { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.questionForm = this.formBuilder.group({
      question_text: ['', [Validators.required, Validators.minLength(5)]],
      answer_1: ['', Validators.required],
      answer_2: ['', Validators.required],
      answer_3: [''],
      answer_4: [''],
      answer_1_correct: [''],
      answer_2_correct: [''],
      answer_3_correct: [''],
      answer_4_correct: ['']
    });
    this.setQuestionErrors();
  }
  setQuestionErrors() {
    this.questionErrors = {
      question_text: '',
      answer_1: '',
      answer_2: ''
    }
  }

  setCorrect(num) {
    if (num == 1){
      this.questionForm.controls['answer_2_correct'].reset();
      this.questionForm.controls['answer_3_correct'].reset();
      this.questionForm.controls['answer_4_correct'].reset();
    } else if (num == 2){
      this.questionForm.controls['answer_1_correct'].reset();
      this.questionForm.controls['answer_3_correct'].reset();
      this.questionForm.controls['answer_4_correct'].reset();
    } else if (num == 3) {
      this.questionForm.controls['answer_1_correct'].reset();
      this.questionForm.controls['answer_2_correct'].reset();
      this.questionForm.controls['answer_4_correct'].reset();
    } else {
      this.questionForm.controls['answer_1_correct'].reset();
      this.questionForm.controls['answer_2_correct'].reset();
      this.questionForm.controls['answer_3_correct'].reset();
    }
  }

  createQuestion(){
    this.setQuestionErrors();
    if (this.questionForm.invalid) {
      let form = this.questionForm.controls;
      if (form.question_text.errors.required) {
        this.questionErrors.question_text = "question text is required"
      } else if (form.question_text.errors.minlength) {
        this.questionErrors.question_text = "question text must be at least five characters long"
      }
      if (form.answer_1.errors) {
        this.questionErrors.answer_1 = "answer 1 is required";
      }
      if (form.answer_2.errors) {
        this.questionErrors.answer_1 = "answer 2 is required";
      }
      return;
    }
    let rawForm = this.questionForm.getRawValue()
    let answer_list = []
    console.log(rawForm);
    // let body = {quiz_id: this.quiz.id, user_id: this.user.id, text: rawForm.question_text, answers: []}
    // this.quiz_api.addQuestion(body).subscribe(
    //   resp => {
    //     console.log(resp);
    //     this.router.navigate(['/edit/'+this.quiz.id])
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // )
  }

  onDelete() {
    if(this.quiz.created_by.id != this.user.id) {
      return;
    }
    let body = { quiz_id: this.quiz.id, user_id: this.user.id }
    this.quiz_api.deleteQuiz(body).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/dashboard']);
      },
      error=>{
        console.log(error);
      }
    )
  }

}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  createQuiz(quizData): Observable<any> {
    return this.http.post(this.baseurl+'/quiz_api/create/', quizData,
    {headers: this.httpHeaders});
  }
  getAllQuizzes(user_id): Observable<any> {
    return this.http.get(this.baseurl+'/quiz_api/get_all/' + user_id,
    {headers: this.httpHeaders});
  }
  getQuiz(quizData): Observable<any> {
    return this.http.get(this.baseurl+'/quiz_api/get_one/' + quizData.quiz_id + '/' + quizData.user_id,
    {headers: this.httpHeaders});
  }
  deleteQuiz(quizData): Observable<any> {
    return this.http.delete(this.baseurl+'/quiz_api/delete_quiz/'+ quizData.quiz_id + '/' + quizData.user_id,
    {headers: this.httpHeaders});
  }
  addQuestion(quizData): Observable<any> {
    return this.http.post(this.baseurl+'/quiz_api/add_question/', quizData,
    {headers: this.httpHeaders});
  }
  deleteQuestion(quizData): Observable<any> {
    return this.http.delete(this.baseurl+'/quiz_api/delete_question/'+ quizData.question_id + '/' + quizData.user_id,
    {headers: this.httpHeaders});
  }
  saveScore(quizData): Observable<any> {
    return this.http.post(this.baseurl+'/quiz_api/save_score/', quizData,
    {headers: this.httpHeaders});
  }
}
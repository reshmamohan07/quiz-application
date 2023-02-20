import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuestions } from '../models/api-types';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }
  public getQuestions(): Observable<IQuestions> {
    return this.http.get<IQuestions>('../assets/json/questions.json');
  }

}

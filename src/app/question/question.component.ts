import { Component, OnInit } from '@angular/core';
import { IQOption, IQuestionOption } from '../models/api-types';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  isQuizCompleted: boolean = false;
  counter = 60;
  interval: any;
  public totalCorrect: number = 0;
  public totalWrong: number = 0;
  q: any;

  constructor(private questionservice: QuestionService) { }
  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.setTimer();
  }
  getAllQuestions() {
    this.questionservice.getQuestions().subscribe(data => {
      this.questionList = data.questions;


    })
  }
  nextQuestion() {
    if (this.currentQuestion < this.questionList.length - 1) {
      this.currentQuestion++;
      this.setTimer();
    }


  }
  previousQuestion() {
    if (this.currentQuestion >= 1) {
      this.currentQuestion--;
      this.setTimer();
    }
  }
  selectOption(option: IQOption, index: number) {


    this.questionList[index].disabled = true;
    if (option.correct && !option.selected) {
      this.points += 10;
    }

    this.questionList[index].options.forEach((elem: IQOption) => {
      elem.selected = false;
    });
    option.selected = true;
    // setTimeout(() => {
    //   this.nextQuestion();
    // }, 1000);
  }
  setTimer() {
    if (this.interval) {
      clearInterval(this.interval);
      this.counter = 60;
    }

    this.interval = setInterval(() => {
      this.counter--;
      if (this.counter <= 0) {
        clearInterval(this.interval);
        this.counter = 60;
        this.nextQuestion();
      }
    }, 1000)
  }

  refreshQuestion() {
    this.currentQuestion = 0;
    this.counter = 60;
    this.points = 0;
    for (let i = 0; i < this.questionList.length; i++) {
      this.questionList[i].disabled = false;
      this.questionList[i].options.forEach((element: IQOption) => {
        element.selected = false;
      });
    }
  }
  result() {
    if (this.questionList.length) {
      this.questionList.forEach((q: IQuestionOption) => {
        this.totalCorrect = q.options.filter((opt) => opt.correct && opt.selected).length ? this.totalCorrect + 1 : this.totalCorrect;
      })
      this.totalWrong = this.questionList.length - this.totalCorrect;
    }
    this.isQuizCompleted = true;
  }
  get hasPassed() {
    return (this.totalCorrect / this.questionList.length) > 0.6;
  }

}

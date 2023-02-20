import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  @ViewChild('name') nameKey!: ElementRef;

  ngOnInit(): void {}
  startQuiz() {
    localStorage.setItem("USER_NAME", this.nameKey.nativeElement.value);
  }


}




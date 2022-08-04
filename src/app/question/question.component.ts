import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  tags = new Set(['python', 'how-to', 'tutorial']);
  formControl = new FormControl(['how-to']);

  constructor() { }

  ngOnInit(): void {
  }


}

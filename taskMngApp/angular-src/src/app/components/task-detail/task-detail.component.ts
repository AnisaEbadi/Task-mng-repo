import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
  inputs: ['task']
})
export class TaskDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

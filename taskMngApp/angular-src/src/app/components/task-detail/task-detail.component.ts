import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
  inputs: ['task'],
  outputs: ['updateTaskEvent']
})
export class TaskDetailComponent implements OnInit {
  task: any;

  private editName: boolean = false;
  private updateTaskEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.editName = false;
  }

  onNameClick(){
    this.editName = true;
  }

  updateTask(){
    this.updateTaskEvent.emit(this.task)
  }
}

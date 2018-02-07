import { Component, OnInit, EventEmitter } from '@angular/core';
import { Task } from '../../models/task';



@Component({
  selector: 'tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
  inputs: ['tasks'],
  outputs: ['SelectTask']
})
export class TasklistComponent implements OnInit {

  public SelectTask = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSelect(tsk: Task){
    this.SelectTask.emit(tsk);
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Task } from '../../models/task';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:Object;
  tasks: Task[] = [
   { "_id" : "1", "name" : "Task 1", "description" : "desc 1", "imp_tec" : "tec 1"}
   ,{ "_id" : "2", "name" : "Task 2", "description" : "desc 2", "imp_tec" : "tec 2"}
   ,{ "_id" : "3", "name" : "Task 3", "description" : "desc 3", "imp_tec" : "tec 3"}
   ,{ "_id" : "4", "name" : "Task 4", "description" : "desc 4", "imp_tec" : "tec 4"}
  ]
  
  selectedTask : Task;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
  err => {
    console.log(err);
    return false;
    });
  }

  onSelectTask(task:any){
    this.selectedTask = task;
    console.log(this.selectedTask);
  }

}

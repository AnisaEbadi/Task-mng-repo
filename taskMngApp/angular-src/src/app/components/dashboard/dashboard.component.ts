import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [TaskService]
})
export class DashboardComponent implements OnInit {

  user:Object;
  tasks: Array<Task>;
  //  Task[] = [
  //  { "_id" : "1", "name" : "Task 1", "description" : "desc 1", "imp_tec" : "tec 1"}
  //  ,{ "_id" : "2", "name" : "Task 2", "description" : "desc 2", "imp_tec" : "tec 2"}
  //  ,{ "_id" : "3", "name" : "Task 3", "description" : "desc 3", "imp_tec" : "tec 3"}
  //  ,{ "_id" : "4", "name" : "Task 4", "description" : "desc 4", "imp_tec" : "tec 4"}
  // ]
  
  selectedTask : Task;
  private hidenewTask: boolean = true;

  constructor(private authService:AuthService, private router:Router, private taskService: TaskService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
  err => {
    console.log(err);
    return false;
    });

    this.taskService.getTasks()
      .subscribe(resTaskData => this.tasks = resTaskData );
  }

  onSelectTask(task:any){
    this.selectedTask = task;
    this.hidenewTask = true;
    console.log(this.selectedTask);
  }

  onSubmitAddTask(task: Task){
    this.hidenewTask = true;
      this.taskService.addTask(task)
        .subscribe(resNewTask => {
          this.tasks.push(resNewTask);
          this.selectedTask = resNewTask;
        })
      }

  onUpdateTaskEvent(task: any){
    this.taskService.updateTask(task)
      .subscribe(resUpdatedTask => task = resUpdatedTask);
    this.selectedTask = null;
  }

  onDeleteTaskEvent(task: any){
   let taskArray = this.tasks;
   this.taskService.deleteTask(task)
    .subscribe(resDeleteTask => {
      for(let i=0;i < taskArray.length; i++){
        if(taskArray[i]._id === task._id){
          taskArray.splice(i,1);
        }
      }
    });
    this.selectedTask = null;
  }

  newTask(){
      this.hidenewTask = false;
  }

}

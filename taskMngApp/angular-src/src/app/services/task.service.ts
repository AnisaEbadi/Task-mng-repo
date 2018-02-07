import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Task } from '../models/task';

@Injectable()
export class TaskService {

  private url = 'http://localhost:3000';
  private getUrl = this.url + '/tasks';
  private postUrl = this.url + '/task';
  private putUrl = this.url + '/task/';
  constructor(private http: Http) { }

  getTasks(){
    return this.http.get(this.getUrl)
      .map((res: Response) => res.json());
  }

  addTask(task: Task){
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers : headers});
    return this.http.post(this.postUrl, JSON.stringify(task), options)
      .map((res: Response) => res.json());  
    }

  updateTask(task: Task){
    let headers = new Headers({ 'Content-Type':'application/json'});
    let options = new RequestOptions({ headers: headers});
    return this.http.put(this.putUrl + task._id, JSON.stringify(task), options)
      .map((res:Response) => res.json());

  }

}

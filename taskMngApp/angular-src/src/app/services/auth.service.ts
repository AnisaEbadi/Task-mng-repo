import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
//import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map'; 

@Injectable()
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user){
    console.log(user);
    let headers = new Headers();
    let url = 'http://localhost:3000/users/register';
    //let url = 'users/register';
    headers.append('Content-Type','application/json');
    return this.http.post(url,user,{headers: headers})
      .map(res => res.json()); 

  }

  // authenticateUser(user){
  //   let headers = new Headers();
  //   let url = 'users/authenticate';
  //   headers.append('Content-Type','application/json');
  //   return this.http.post(url,user,{headers: headers})
  //     .map(res => res.json()); 

  // }

  // getProfile()
  // {
  //   let headers = new Headers();
  //   this.loadToken();
  //   let url = 'users/profile';
  //   headers.append('Authorization', this.authToken);
  //   headers.append('Content-Type','application/json');
  //   return this.http.get(url,{headers: headers})
  //     .map(res => res.json()); 
  // }

  // storeUserData(token, user){
  //   localStorage.setItem('id_token',token);
  //   localStorage.setItem('user', JSON.stringify(user));
  //   this.authToken = token;
  //   this.user = user;
  // }

  // loadToken(){
  //   const token = localStorage.getItem('id_token');
  //   this.authToken = token;
  // }

  // loggedIn(){
  //   return tokenNotExpired('id_token');
  // }

  // logout(){
  //   this.authToken = null;
  //   this.user = null;
  //   localStorage.clear();
  // }

}

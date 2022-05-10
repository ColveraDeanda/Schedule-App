import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../models/task.model';;
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public url: string;

  constructor(private _http: HttpClient) { 
    this.url = "http://localhost:3000/api/";
  }

  saveTask(body: Task): Observable<any> {
    let task = JSON.stringify(body);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + "save-task", task, {headers: headers});
  }

  getTasks() {
   let headers = new HttpHeaders().set('Content-Type', 'application/json');
   return this._http.get(this.url + "tasks", {headers: headers});
  }

  getTask(id: string): Observable<any> {
   let headers = new HttpHeaders().set('Content-Type', 'application/json');
   return this._http.get(this.url + "task/" + id, {headers: headers});
  }

  deleteTask(id: string): Observable<any> {
   let headers = new HttpHeaders().set('Content-Type', 'application/json');
   return this._http.delete(this.url + "task/" + id, {headers: headers});
  }

  updateTask(id: string, body: Task): Observable<any> {
   let task = JSON.stringify(body);
   let headers = new HttpHeaders().set('Content-Type', 'application/json');
   return this._http.put(this.url + "task/" + id, task, {headers: headers});
  }

  getByDayAndAmonth(day: number, month: string): Observable<any> {
   let headers = new HttpHeaders().set('Content-Type', 'application/json');
   return this._http.get(this.url + "task/" + day + "/" + month, {headers: headers});
  }

  getCategoriesByMonth(month: string): Observable<any> {
   let headers = new HttpHeaders().set('Content-Type', 'application/json');
   return this._http.get(this.url + "tasks/" + month, {headers: headers});
  }

  getTasksByDayMonthAndYear(day: number, month: string, year: number): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + "tasks/" + day + "/" + month + "/" + year, {headers: headers});
   }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Interfaces
import { ITask } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  base_url: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }


  /**
   * @GET - Get All Tasks
   */
  getAllTasks() {
    return this.http.get(`${this.base_url}tasks`)
      .toPromise()
      .then(res => <ITask[]>res['data'])
      .then(data => { return data; });
  }

  /**
   * @GET - Search Task By ID
  */
  getTaskById(id: string) {
    return this.http.get(`${this.base_url}tasks/${id}`)
      .toPromise()
      .then(res => <ITask>res['data'])
      .then(data => {return data});
  }

  /**
   * @POST - Create Task
  */
  createNewTask(taskDetail: ITask) {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(taskDetail);
    console.log(body)
    return this.http.post(this.base_url + 'tasks/create', body,{'headers':headers})
  }

  /**
   * @PUT - Update Task
  */
  updateTask(id:string, taskDetail: ITask) {
    const headers = {'content-type': 'application/json'}
    const body = JSON.stringify(taskDetail);
    console.log(body);
    return this.http.put(this.base_url + `tasks/update/${id}`, body, {'headers': headers});
  }

  /**
   * @DELETE - Delete Task
  */
 deleteTask(id: string) {
   const headers = {'content-type': 'application/json'};
   return this.http.delete(this.base_url + `tasks/delete/${id}`, {'headers': headers});
 }
}

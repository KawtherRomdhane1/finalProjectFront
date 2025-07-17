import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TaskModel} from "../models/task.model";
import {tasks} from "../../../mock-api/apps/tasks/data";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl: string = 'http://localhost:8080/api/Task';
  constructor(private http: HttpClient) {}

  //Récupérer tous les taches
  getAllTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(this.apiUrl);
  }

  //Récupérer une seul taches par ID
  getTaskById(id: number): Observable<TaskModel> {
    return this.http.get<TaskModel>(`${this.apiUrl}/${id}`);
  }

  //Ajouter une taches
  addTask(task: Partial<TaskModel>): Observable<TaskModel> {
    return this.http.post<TaskModel>(this.apiUrl, task);
  }

  //Mettre à jour une taches
  updateTask(id: number, Task: Partial<TaskModel>): Observable<TaskModel> {
    return this.http.put<TaskModel>(`${this.apiUrl}/${id}`, tasks);
  }

  //Supprimer une taches
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }




}


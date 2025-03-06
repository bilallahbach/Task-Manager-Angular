// task.service.ts
import { Injectable } from '@angular/core';

export interface Task {
  name: string;
  type: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    { name: 'Task 1', type: 'easy',done:true },
    { name: 'Task 2', type: 'medium', done:false }
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task): void {
    this.tasks.push(task);
  }
  delTask(idT:number): void {
    this.tasks.splice(idT,1);
  }
}
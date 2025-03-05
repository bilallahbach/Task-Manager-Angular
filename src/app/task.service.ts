// task.service.ts
import { Injectable } from '@angular/core';

export interface Task {
  name: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    { name: 'Task 1', type: 'easy' },
    { name: 'Task 2', type: 'medium' }
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task): void {
    this.tasks.push(task);
  }
  delTask(idT:number): void {
    delete this.tasks[idT];
  }
}
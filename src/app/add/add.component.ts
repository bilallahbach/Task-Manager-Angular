import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  tasks: any[] = [];
  taskName: string = '';
  taskType: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.http.get('http://localhost:8080/api/tasks').subscribe((data: any) => {
      this.tasks = data;
    }, error => {
      console.error('Error fetching tasks:', error);
    });
  }

  submitForm() {
    if (this.taskName && this.taskType) {
      const newTask = { title: this.taskName, type: this.taskType, done: false };
      this.http.post('http://localhost:8080/api/tasks', newTask).subscribe(() => {
        this.fetchTasks();
        this.taskName = '';
        this.taskType = '';
      }, error => {
        console.error('Error adding task:', error);
      });
    }
  }

  deleteTask(id: number) {
    this.http.delete(`http://localhost:8080/api/tasks/${id}`).subscribe(() => {
      this.fetchTasks();
    }, error => {
      console.error('Error deleting task:', error);
    });
  }

  toggleClass(id: number) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.done = !task.done;
      this.http.put(`http://localhost:8080/api/tasks/${id}`, task).subscribe(() => {
        this.fetchTasks();
      }, error => {
        console.error('Error updating task:', error);
      });
    }
  }
}

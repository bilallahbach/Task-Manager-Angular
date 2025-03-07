import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-home',
  imports: [CommonModule,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  tasksList: any[] = [];

  constructor(private http: HttpClient) {}

  fetchTasks() {
    this.http.get('http://localhost:8080/api/tasks').subscribe((data: any) => {
      this.tasksList = data;
      this.calculateTaskCounts();
    }, error => {
      console.error('Error fetching tasks:', error);
    });
  }

  ngOnInit() {
    this.fetchTasks();
  }
  totalTasks: number = 0;
  easyCounts: number = 0;
  medCounts: number = 0;
  hardCounts: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tasksList']) {
      this.calculateTaskCounts();
    }
  }

  calculateTaskCounts() {
    if(this.tasksList.length>0){
      this.totalTasks = this.tasksList.length;
    this.easyCounts = (this.tasksList.filter(task => task.type === 'easy').length / this.totalTasks) * 100;
    this.medCounts = (this.tasksList.filter(task => task.type === 'medium').length / this.totalTasks) * 100;
    this.hardCounts = (this.tasksList.filter(task => task.type === 'hard').length / this.totalTasks) * 100;
    }
    
}
}
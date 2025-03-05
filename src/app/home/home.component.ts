import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../task.service';


@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  tasksList: {name:string , type:string}[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasksList = this.taskService.getTasks();
    this.calculateTaskCounts();
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
    this.totalTasks = this.tasksList.length;
    
    this.easyCounts = (this.tasksList.filter(task => task.type === 'easy').length / this.totalTasks) * 100;
    this.medCounts = (this.tasksList.filter(task => task.type === 'medium').length / this.totalTasks) * 100;
    this.hardCounts = (this.tasksList.filter(task => task.type === 'hard').length / this.totalTasks) * 100;
}
}
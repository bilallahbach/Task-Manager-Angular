import { Component, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add',
  imports: [FormsModule,CommonModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  tasks: {name:string,type:string}[] = [];
  constructor(private taskService: TaskService) {}
  taskName: string = "";
  taskType: string = "";
  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }
    ngOnChanges(changes: SimpleChanges) {
      if (changes['tasksList']) {
        this.tasks = this.taskService.getTasks();
      }
    }
  submitForm() {
    if(this.taskName && this.taskType){
      this.taskService.addTask({...{name:this.taskName,type:this.taskType}});
    this.taskName = "";
    this.taskType = "";
    }
  }
  deleteTask(idTask:number){
    this.taskService.delTask(idTask);
  }
}

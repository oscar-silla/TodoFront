import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// MDB Angular Pro
import { ButtonsModule, WavesModule, CardsModule } from 'angular-bootstrap-md';
// Service
import { TaskService } from '../../services/task.service';
// Interfaces
import { ITask } from '../../interfaces/task.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tasks: ITask[] = [];
  constructor(private taskService: TaskService,
              private router : Router) { }

  ngOnInit(): void {
    this.taskService.getAllTasks().then(data => {
      this.tasks = data;
      console.log(this.tasks)
    })
  }

  // Show Detail Task
  showMore(id: string) {
    this.router.navigate(['/task', id]);
  }

  // Priority Color Badges
  color(priority: string) {
    switch (priority.toLocaleLowerCase()) {
      case 'urgent': return 'red';
      case 'important': return 'orange';
      case 'medium': return 'green';
      case 'low': return 'blue';
    }
  }

}
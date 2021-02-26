import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  dataToChange: ITask;
  

  constructor(private taskService: TaskService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.taskService.getAllTasks().then(data => {
      this.tasks = data;
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

  changeStatus(id: string) {
    this.taskService.getTaskById(id).then(data => {
      if (data.done == false) {
        data.done = true;
          this.taskService.updateTask(id, data).subscribe(() => {
            this.taskService.getAllTasks().then(data => {
              this.tasks = data;
            })
        });
      } else {
        data.done = false;
          this.taskService.updateTask(id, data).subscribe(() => {
            this.taskService.getAllTasks().then(data => {
              this.tasks = data;
            })
        });
      }
    });
  }
}
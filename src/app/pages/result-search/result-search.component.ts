import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Interface
import { ITask } from 'src/app/interfaces/task.interface';

// Service
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.scss']
})
export class ResultSearchComponent implements OnInit {

  title: string;
  tasks: ITask[];

  constructor(private activatedRoute: ActivatedRoute,
              private taskService: TaskService,
              private router : Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.title = param.title;
      this.taskService.searchTask(this.title).then(data => {
        this.tasks = data;
      });
    });
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

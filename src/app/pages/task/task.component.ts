import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  idTask: string;
  task : any;
  constructor(private activatedRoute: ActivatedRoute,
              private taskService: TaskService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.idTask = param.id;
    });
    this.taskService.getTaskById(this.idTask).then(data => {
      this.task = data;
      console.log(this.task)
    });
  }

  // Route to modify
  goModify(id: string) {
    this.router.navigate(['/modify', id]);
  }

  deleteTask() {
    this.taskService.deleteTask(this.idTask).subscribe(data => {
      console.log(data);
    });
    this.router.navigate(['/home']);
  }

}

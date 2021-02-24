import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from 'src/app/interfaces/task.interface';
import { TaskService } from 'src/app/services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {

  taskForm: FormGroup;
  idTask: string;
  option: string;
  showAlert: boolean = false;
  showAlertError: boolean = false;

  task: ITask = {
    title: '',
    todo: '',
    priority: '',
    done: false
  };

  modified: ITask = {
    title: '',
    todo: '',
    priority: '',
    done: false
  };

  constructor(private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder,
    private location: Location) { }

  updateTaskForm() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      todo: ['', Validators.required],
      priority: ['', Validators.required],
      done: false
    });
  }

  ngOnInit(): void {
    this.updateTaskForm();
    this.activatedRoute.params.subscribe(param => {
      this.idTask = param.id;
      this.taskService.getTaskById(param.id).then(data => {
        this.task = data;
        console.log(this.task.priority);
      });
    });
  }

  onSelected() {
    this.modified.priority = this.option;
  }

  onSubmit(taskDetail: ITask) {
    if (taskDetail.title === "" || taskDetail.priority === ''
      || taskDetail.todo == "") {
      this.showAlertError = true;
    } else {
      this.taskService.updateTask(this.idTask, taskDetail).subscribe(data => {
        console.log(data);
      });
      this.showAlert = true;
      this.showAlertError= false;
      if (this.showAlert) {
        setTimeout(() => {
          this.showAlert=false;
          console.log(this.showAlert);
          this.router.navigate(['/home']);
        }, 3000);
      }
    }
  }

  goBack() {
    this.location.back();
  }



}

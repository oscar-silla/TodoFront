import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Interface
import { ITask } from 'src/app/interfaces/task.interface';

// Service
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss']
})
export class CreateNewComponent implements OnInit {

  taskForm: FormGroup;
  selected: string = '';
  showAlert: boolean = false;
  showAlertError: boolean = false;

  task: ITask = {
    title: '',
    todo: '',
    priority: '',
    done: false
  };

  constructor(private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder) { }

  // Validation requeriments
  createTaskForm() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      priority: ['', Validators.required],
      todo: ['', Validators.required],
      done: false
    });
  }

  ngOnInit(): void {
    this.createTaskForm();
  }

  // Select Priorities
  select() {
    switch (this.selected) {
      case '1':
        this.task.priority = 'Urgent';
        break;
      case '2':
        this.task.priority = 'Important';
        break;
      case '3':
        this.task.priority = 'Medium';
        break;
      case '4':
        this.task.priority = 'Low';
        break;
    }
  }

  onSubmit(taskDetail: ITask) {
    // Validations
    if (taskDetail.title === "" || taskDetail.priority === ''
      || taskDetail.todo == "") {
      this.showAlertError = true;
    } else {
      this.taskService.createNewTask(taskDetail).subscribe(data => {
        console.log(data)
      });
      this.showAlert = true;
      this.showAlertError = false;

      if (this.showAlert) {
        setTimeout(() => {
          this.showAlert=false;
          console.log(this.showAlert);
          this.router.navigate(['/home']);
        }, 3000);
      }
    }
  }

}

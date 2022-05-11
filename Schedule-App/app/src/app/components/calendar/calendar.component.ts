import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router'
import { DataService } from 'src/app/services/data.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../models/task.model'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  date = new Date();
  property: string = ''
  theme: Theme;
  themeTittle: string;
  display: boolean = false;
  displayCreateTask: boolean = false;
  productDialog: boolean = false;
  categories: Array<any> = [];
  task: Task;
  message: any = {
    success: false,
    error: false
  }
  taskRepeated: string = '';
  errors: Array<String> = [];
  tasks: Array<any> = [];
  isUpdating: boolean = false;
  id: string = '';

  // Dates
  day: number;
  month: string;
  year: number;

  constructor(
    private taskService: TaskService,
    private dataService: DataService,
    private router: Router,

    @Inject(DOCUMENT) private documet: Document,
    private renderer: Renderer2
  ) {
    this.theme = 'light';
    this.themeTittle = 'Dark'

    this.day = 0;
    this.month = dataService.month;
    this.year = dataService.year;

    this.task = new Task('', '', '', '', this.day, this.month, this.year);
  }

  ngOnInit(): void {
    this.initializeTheme()

    this.categories = [
      { id: "NOT", name: "Note" },
      { id: "CMP", name: "Birthday" },
      { id: "TAR", name: "Task" },
      { id: "PRO", name: "Project" }
    ]
  }

  initializeTheme = (): void => {
    let currentTheme = this.documet.body.getAttribute('class');
    if (currentTheme == 'dark') {
      this.theme = 'dark';
      this.themeTittle = 'Light';
    }
    this.renderer.addClass(this.documet.body, this.theme); // adding class to body.
  }

  saveTask(form: any) {
    if (this.isUpdating) {
      let currentId = this.id;
      this.updateTask(currentId);
      this.isUpdating = false;
      console.log('aquiiii');
      
    } else {
      this.task.day = this.day;
      this.task.year = this.year;
      this.taskService.saveTask(this.task).subscribe({
        next: (value) => {
          this.getTasks(this.day);
          console.log(value);
          this.message.success = true;
          this.displayCreateTask = false;
          setTimeout(() => {
            this.message.success = false;
          }, 10000);
          form.reset();
        },
        error: (e) => {
          if (e.error.repeated) {
            this.taskRepeated = `The tittle ${this.task.title} on ${this.month} ${this.day} already exists`;
            console.error(e.error.repeated)
          } else {
            this.errors.push(e.error.errors);
            console.log(e.error.errors);
          }

          this.message.error = true;
          this.displayCreateTask = false;
          this.display = false;

          setTimeout(() => {
            this.message.error = false;
          }, 15000)

          form.reset();
        }
      })
    }
  }

  setUpdateTask(id: string) {
    this.isUpdating = true;
    this.displayCreateTask = true;
    this.id = id;
    this.getTask(id)
  }

  getTasks(day: number) {
    this.taskService.getTasksByDayMonthAndYear(day, this.month, this.year).subscribe({
      next: (res) => {
        this.tasks = res.data;
        console.log((this.tasks));
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: (res) => {
        this.getTasks(this.day);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateTask(id: string) {
    this.getTask(id);
    console.log(this.task);
    this.task._id = id;
    this.taskService.updateTask(id, this.task).subscribe({
      next: (res) => {
        console.log(res);
        this.displayCreateTask = false;
        this.getTasks(this.day)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getTask(id: string) {
    this.taskService.getTask(id).subscribe({
      next: (res) => {
        const { category, description, title } = res.task;
        this.task.category = category;
        this.task.description = description;
        this.task.title = title;
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  swithTheme() {
    this.documet.body.classList.replace(this.theme, this.theme === 'light' ? (this.theme = 'dark') : (this.theme = 'light'))
    this.theme === 'light' ? this.themeTittle = 'Dark' : this.themeTittle = 'Light';
  }

  showDialog(day: number) {
    this.display = true;
    this.day = day;
    this.getTasks(day);
  }

  showCreateTask() {
    this.task.category = '';
    this.task.title = '';
    this.task.description = ''
    this.displayCreateTask = true;
  }

  lessYears() {
    this.year = this.year - 1;
    this.dataService.year = this.year;
  }

  moreYears() {
    this.year = this.year + 1;
    this.dataService.year = this.year;
  }

  isleapyear() {
    return (this.year % 4 === 0 && this.year % 100 !== 0 && this.year % 400 !== 0) || (this.year % 100 === 0 && this.year % 400 === 0)
  }

  toMonthComponent() {
    this.router.navigate(['month']);
  }

  openNew() {
    this.productDialog = true;
  }

}

export type Theme = 'light' | 'dark';

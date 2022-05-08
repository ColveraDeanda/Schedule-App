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
      {id: "NOT", name: "Note"},
      {id: "CMP", name: "Birthday"},
      {id: "TAR", name: "Task"},
      {id: "PRO", name: "Project"}
    ]
  }

  initializeTheme  = (): void => {
    let currentTheme = this.documet.body.getAttribute('class');
    if(currentTheme == 'dark') {
      this.theme = 'dark';
      this.themeTittle = 'Light';
    }
    this.renderer.addClass(this.documet.body, this.theme); // adding class to body.
  }

  saveTask (form: any) {
    this.task.day = this.day;
    this.task.year = this.year;
    this.taskService.saveTask(this.task).subscribe({
      next: (value) =>  {
        console.log(value);
        this.message.success = true;
        this.displayCreateTask = false;
        setTimeout(() => {
          this.message.success = false;
        }, 10000);
        form.reset();
      },
      error: (e) => {
        if(e.error.repeated) {
          this.taskRepeated = `The tittle ${this.task.title} on ${this.month} ${this.day} already exists` ;
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
    
  swithTheme() {
    this.documet.body.classList.replace(this.theme, this.theme === 'light' ? (this.theme = 'dark') : (this.theme = 'light'))
    this.theme === 'light' ? this.themeTittle = 'Dark' : this.themeTittle = 'Light';
  }

  showDialog(day: number) {
    this.display = true;
    this.day = day;
  }

  showCreateTask() {
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

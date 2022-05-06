import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  property: string = ''
  theme: Theme = 'light';
  themeTittle: string = 'Dark';
  display: boolean = false;

  // Dates
  day: number;
  month: string = 'August';
  year: number = 2022;

  constructor(
    @Inject(DOCUMENT) private documet: Document,
    private renderer: Renderer2
  ) {
    this.day = 0;
  }

  ngOnInit(): void {
    this.initializeTheme()
  }

  initializeTheme = (): void =>
    this.renderer.addClass(this.documet.body, this.theme); // adding class to body.

  swithTheme() {
    this.documet.body.classList.replace(this.theme, this.theme === 'light' ? (this.theme = 'dark') : (this.theme = 'light'))
    this.theme === 'light' ? this.themeTittle = 'Dark' : this.themeTittle = 'Light';
  }

  showDialog(day: number) {
    this.display = true;
    this.day = day;
  }

  lessYears() {
    this.year = this.year - 1;
  }

  moreYears() {
    this.year = this.year + 1;
  }


}

export type Theme = 'light' | 'dark';

import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  theme: Theme = 'light';
  themeTittle: string = 'Dark';

  constructor(
    @Inject(DOCUMENT) private documet: Document,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.initializeTheme()
  }

  initializeTheme = (): void =>
    this.renderer.addClass(this.documet.body, this.theme); // adding class to body.

    swithTheme() {
      this.documet.body.classList.replace(this.theme, this.theme === 'light' ? (this.theme = 'dark') : (this.theme = 'light') )
      this.theme === 'light' ? this.themeTittle = 'Dark' : this.themeTittle = 'Light';      
    }


}

export type Theme = 'light' | 'dark';

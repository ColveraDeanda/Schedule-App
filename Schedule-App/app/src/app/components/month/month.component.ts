import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  toCalendar() {
    this.router.navigate(['/calendar']);
  }

}

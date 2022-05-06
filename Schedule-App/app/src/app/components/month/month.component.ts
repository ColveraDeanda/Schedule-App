import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

  constructor( private router: Router, 
    private dataService: DataService) { 
      
  }

  ngOnInit(): void {
  }

  toCalendar(month: string) {
    this.dataService.month = month;
    this.router.navigate(['/calendar']);
  }

}

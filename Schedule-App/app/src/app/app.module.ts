import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';

import { CalendarComponent } from './components/calendar/calendar.component';
import { MonthComponent } from './components/month/month.component';
import { DataService } from './services/data.service';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    MonthComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    RadioButtonModule,
    ToastModule,
    ToolbarModule,
    BrowserAnimationsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

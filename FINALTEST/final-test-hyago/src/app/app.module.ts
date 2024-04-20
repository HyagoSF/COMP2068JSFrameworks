import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { StudentService } from './services/student.service';
import { AppRoutingModule } from './app.routes'; // Update path if needed

@NgModule({
  declarations: [],
  imports: [CommonModule, BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [StudentService],
})
export class AppModule {}

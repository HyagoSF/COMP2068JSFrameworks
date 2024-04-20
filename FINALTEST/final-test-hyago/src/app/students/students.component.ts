import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import Student from './models/student';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  selectedStudent: Student | null = { id: 200536449, name: 'Hyago' };
  isFormOpen: boolean = false;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService
      .getStudents()
      .subscribe((students) => (this.students = students));
  }

  openCreateForm() {
    this.selectedStudent = null;
    this.isFormOpen = true;
  }

  openUpdateForm(student: Student) {
    this.selectedStudent = student;
    this.isFormOpen = true;
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe(() => this.getStudents());
  }

  onSubmit() {
    if (this.selectedStudent) {
      this.updateStudent();
    } else {
      this.createStudent();
    }
  }

  createStudent() {
    this.studentService
      .createStudent(this.selectedStudent as Student)
      .subscribe(() => {
        this.getStudents();
        this.isFormOpen = false;
        this.selectedStudent = null;
      });
  }

  updateStudent() {
    this.studentService
      .updateStudent(
        this.selectedStudent?.id as number,
        this.selectedStudent as Student
      )
      .subscribe(() => {
        this.getStudents();
        this.isFormOpen = false;
        this.selectedStudent = null;
      });
  }
}

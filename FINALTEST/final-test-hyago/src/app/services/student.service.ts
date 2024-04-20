import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Student {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://mybackendurl/students'; // TODO: Update this URL

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(
      `<span class="math-inline">\{this\.apiUrl\}/</span>{id}`
    );
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(
      `<span class="math-inline">\{this\.apiUrl\}/</span>{id}`,
      student
    );
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(
      `<span class="math-inline">\{this\.apiUrl\}/</span>{id}`
    );
  }
}

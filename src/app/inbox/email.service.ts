import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface EmailSummery {
  id: string;
  subject: string;
  from: string;
}

interface Email {
  id: string;
  subject: string;
  text: string;
  to: string;
  from: string;
  html: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private baseUrl = 'https://api.angular-email.com';

  constructor(private http: HttpClient) { }

  getEmails() {
    return this.http.get<EmailSummery[]>(`${this.baseUrl}/emails`);
  }

  getEmail<Email>(id: string) {
    return this.http.get(`${this.baseUrl}/emails/${id}`);
  }
}

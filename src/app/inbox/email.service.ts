import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Email } from './email'

interface EmailSummery {
  id: string;
  subject: string;
  from: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private baseUrl = 'https://api.angular-email.com';

  private closeModal = new Subject<any>();

  closeModalObservable$ = this.closeModal.asObservable();

  constructor(private http: HttpClient) { }

  getEmails() {
    return this.http.get<EmailSummery[]>(`${this.baseUrl}/emails`);
  }

  getEmail(id: string) {
    return this.http.get<Email>(`${this.baseUrl}/emails/${id}`);
  }

  sendEmail(email: Email) {
    return this.http.post(`${this.baseUrl}/emails/`, email);
  }

  triggerCloseModal(close: string) {
    if (close) {
      this.closeModal.next(close);
    }
  }
}

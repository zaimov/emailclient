import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { AuthService } from 'src/app/auth/auth.service';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent implements OnInit {

  email: Email;

  composeButtonText = 'Compose';

  constructor(private authService: AuthService, private emailService: EmailService) { }

  ngOnInit(): void {
    this.email = this.resetEmail();
  }

  resetEmail() {
    return {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: `${this.authService.username}@angular-email.com`
    }
  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.emailService.triggerCloseModal('Close Modal');
      this.email = this.resetEmail();
    });
  }

}

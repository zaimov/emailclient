import { Component, Input, OnInit } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent {

  @Input() email: Email;

  replyButtonText = 'Reply';

  constructor(private emailService: EmailService) { }

  ngOnChanges(): void {
    this.email = this.resetEmail();
  }

  resetEmail() {
    return {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n------- ${this.email.from} wrote: \n> ${this.email.text.replace(/\n/gi, '\n> ')}`
    };
  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.emailService.triggerCloseModal('Close Modal');
      this.email = this.resetEmail();
    });
  }

}

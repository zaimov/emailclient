import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {
  email: Email;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private emailService: EmailService) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(({ id }) => {
        return this.emailService.getEmail(id)
          .pipe(
            catchError(() => {
              this.router.navigateByUrl('/inbox/not-found');

              return EMPTY;
            })
          );
      })
    ).subscribe((email) => {
      this.email = email;
    })
  }

}

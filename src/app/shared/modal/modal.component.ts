import { Component, ElementRef, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EmailService } from 'src/app/inbox/email.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  closeResult: string;

  private subscription: Subscription;

  @Input() buttonText: string = '';

  constructor(private el: ElementRef, private modalService: NgbModal, private emailService: EmailService) { }

  ngOnInit(): void {
    this.subscription = this.emailService.closeModalObservable$.subscribe((res) => {
        this.modalService.dismissAll(res);
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}

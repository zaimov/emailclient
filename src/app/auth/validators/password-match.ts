import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class PasswordMatch implements Validators {
    validate(formGroup: FormGroup) {
        const { password, passwordConfirmation } = formGroup.value;

        return password === passwordConfirmation ? null : { passwordsDontMatch: true };
    }
}

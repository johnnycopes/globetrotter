import { ValidationErrors, FormGroup } from '@angular/forms';

export class CustomValidators {

  static checkPasswords(group: FormGroup): ValidationErrors | null {
    let password = group.get('password')?.value;
    let confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { differentPasswords: true }
  }
}

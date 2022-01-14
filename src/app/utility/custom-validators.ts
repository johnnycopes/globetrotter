import { ValidationErrors, FormGroup } from '@angular/forms';

export class CustomValidators {

  static checkPasswords(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value as string ?? "";
    const confirmPassword = group.get('confirmPassword')?.value as string ?? "";
    return password === confirmPassword ? null : { differentPasswords: true }
  }
}

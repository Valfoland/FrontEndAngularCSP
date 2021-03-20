import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export class CustomValidator {

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }

      const valid = regex.test(control.value);

      return valid ? null : error;
    };
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('Password').value;
    const confirmPassword: string = control.get('ConfirmPassword').value;
    if (password !== confirmPassword) {
      control.get('ConfirmPassword').setErrors({ NoPassswordMatch: true });
    }
  }
}
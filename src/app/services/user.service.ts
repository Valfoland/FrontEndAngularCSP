import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CustomValidator } from '../custom-validator/custom-validator';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "/api/";

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  formModel = this.fb.group({
    Email: ['',
      Validators.compose([Validators.email, Validators.required])
    ],
    Password: ['',
      Validators.compose([
        Validators.required,
        CustomValidator.patternValidator(/\d/, { hasNumber: true }),
        CustomValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
        Validators.minLength(8)
      ])
    ],
    ConfirmPassword: ['', Validators.compose([Validators.required])]
  },
    { validator: CustomValidator.passwordMatchValidator }
  );

  register() {
    var body = {
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Password,
    };

    return this.http.post(this.url + 'Account/Register', body);
  }

  login(formData) {
    return this.http.post(this.url + 'Account/Login', formData);
  }
}

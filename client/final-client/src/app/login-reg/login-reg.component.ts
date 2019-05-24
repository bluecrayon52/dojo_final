import { Component, OnInit } from '@angular/core';
import { LoginRegService } from './../login-reg.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.css']
})
export class LoginRegComponent implements OnInit {
  regForm: FormGroup;
  loginForm: FormGroup;
  name_validators = [Validators.required, Validators.minLength(2), Validators.pattern("[A-Za-z]{2,45}")];
  pass_validators = [Validators.required, Validators.minLength(8), Validators.pattern("((\\S*)([A-Z]+)(\\S*)([0-9]+)(\\S*))|((\\S*)([0-9]+)(\\S*)([A-Z]+)(\\S*))")];
  reg_error_obj: { first_name: any; last_name: any; birthday: any; email: any; password: any; confirm_password: any; reg_main?: any; };
  login_error_obj: { email: any; password: any; login_main?: any; };
  reg_submitted = false;
  login_submitted = false;

  constructor(private loginregservice: LoginRegService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      first_name: ['', this.name_validators],
      last_name: ['', this.name_validators],
      birthday: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', this.pass_validators],
      confirm_password: ['', this.pass_validators]
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', this.pass_validators]
    });

    this.setRegErrorObj();
    this.setLoginErrorObj();
  }

  get regF() {
    return this.regForm.controls;
  }

  get logF() {
    return this.loginForm.controls;
  }

  setRegErrorObj() {
    this.reg_error_obj = {
      first_name: '',
      last_name: '',
      birthday: '',
      email: '',
      password: '',
      confirm_password: '',
      reg_main: ''
    }
  }

  setLoginErrorObj() {
    this.login_error_obj = {
      email: '',
      password: '',
      login_main: ''
    }
  }

  onRegister() {
    let valid = true;
    this.reg_submitted = true;
    this.login_submitted = false;
    this.setRegErrorObj();
    this.setLoginErrorObj();
    this.loginForm.reset();

    // form validation errors 
    if (this.regForm.invalid) {
      valid = false;
      let form = this.regF;
      // first name errors 
      if (form.first_name.errors) {
        if (form.first_name.errors.required){
          this.reg_error_obj.first_name ='first name required';
        } else if(form.first_name.errors.minlength){
          this.reg_error_obj.first_name ='first name must be at least 2 characters long';
        } else if(form.first_name.errors.pattern){
          this.reg_error_obj.first_name ='first name must contain only letters';
        }
      }
      // last name errors 
      if(form.last_name.errors) {
        if (form.last_name.errors.required){
          this.reg_error_obj.last_name ='last name required';
        } else if(form.last_name.errors.minlength){
          this.reg_error_obj.last_name ='last name must be at least 2 characters long';
        } else if(form.last_name.errors.pattern){
          this.reg_error_obj.last_name ='last name must contain only letters';
        }
      }
      // birthday error 
      if (form.birthday.errors) {
        if (form.birthday.errors.required) {
          this.reg_error_obj.birthday ='birthday field required';
        }
      }
      // email errors
      if (form.email.errors) {
        if (form.email.errors.required) {
          this.reg_error_obj.email ='email required';
        } else if (form.email.errors.email) {
          this.reg_error_obj.email ='invalid email address';
        }
      }
      // password errors 
      if (form.password.errors) {
        if (form.password.errors.required) {
          this.reg_error_obj.password ='password required';
        } else if (form.password.errors.minlength) {
          this.reg_error_obj.password ='password must be at least 8 characters long';
        } else if (form.password.errors.pattern) {
          this.reg_error_obj.password ='password must contain one upper case letter, one number, and no spaces';
        }
      }
      // confirm password errors
      if (form.confirm_password.errors) {
        if (form.confirm_password.errors.required) {
          this.reg_error_obj.confirm_password ='please confirm password';
        } else if (form.confirm_password.errors.minlength) {
          this.reg_error_obj.confirm_password ='confirm password must be at least 8 characters long';
        } else if (form.confirm_password.errors.pattern) {
          this.reg_error_obj.confirm_password ='confirm password must contain one upper case letter, one number, and no spaces';
        }
      }
    } 
    // password does not match confirm password
    if(!this.regF.confirm_password.errors && this.regF.password.value.localeCompare(this.regF.confirm_password.value)) {
      valid = false;
      this.reg_error_obj.confirm_password ='passwords do not match';
    }
    // birthday in the past and user at least 13 
    if (!this.regF.birthday.errors) { 
      let date = Date.parse(this.regF.birthday.value);
      if (date >= Date.now()) {
        valid = false;
        this.reg_error_obj.birthday = 'birthday must be in the past';
      } else if ((Date.now() - Date.parse(this.regF.birthday.value)) < 410240376000) {
        valid = false;
        this.reg_error_obj.birthday = 'user must be at least 13 years of age';
      }
    }
    if(!valid) {
      return;
    }
  
    this.loginregservice.registerUser(this.regForm.getRawValue()).subscribe(
      resp => {
        alert(`User ${resp.first_name} ${resp.last_name} has been registered!`);
      },
      error => {
        this.reg_error_obj = {
          first_name: error.error.first_name,
          last_name: error.error.last_name,
          birthday: error.error.birthday,
          email: error.error.email,
          password: error.error.password,
          confirm_password: error.error.confirm_password,
          reg_main: error.error.reg_main
        }
      }
    );
  }

  onLogin() {
    let valid = true;
    this.login_submitted = true;
    this.reg_submitted = false;
    this.setLoginErrorObj();
    this.setRegErrorObj();
    this.regForm.reset();

    // form validation errors
    if (this.loginForm.invalid) {
      valid = false;
      let form = this.logF; 
      // email errors
      if (form.email.errors) {
        if (form.email.errors.required) {
          this.login_error_obj.email ='email required';
        } else if (form.email.errors.email) {
          this.login_error_obj.email ='invalid email address';
        }
      }
      // password errors 
      if (form.password.errors) {
        if (form.password.errors.required) {
          this.login_error_obj.password ='password required';
        } else if (form.password.errors.minlength) {
          this.login_error_obj.password ='password must be at least 8 characters long';
        } else if (form.password.errors.pattern) {
          this.login_error_obj.password ='password must contain at least one upper case letter and one number';
        }
      }
    }

    if(!valid) {
      return;
    }

    this.loginregservice.loginUser(this.loginForm.getRawValue()).subscribe(
      resp => {
        localStorage.setItem('currentUser', JSON.stringify(resp));
        // let user = JSON.parse(localStorage.getItem('currentUser'));
        // console.log(user.first_name)
        // alert(`User ${resp.first_name} ${resp.last_name} has been logged in!`);
        this.router.navigate(['/dashboard'])
      },
      error => {
        console.log(error);
        this.login_error_obj = {
          email: error.error.login_em,
          password: error.error.login_pass,
          login_main: error.error.login_main
        }
      }
    );
  }

}

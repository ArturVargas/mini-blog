
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      country: new FormControl('', [Validators.required])
    })
  }

  sendForm() {
    if(this.registerForm.invalid){return;}
    let user = new User(
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.userName,
      this.registerForm.value.component
    );
    this.auth.newUser(user);
  }

}

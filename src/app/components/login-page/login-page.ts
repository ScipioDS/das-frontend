import {Component, inject, OnInit} from '@angular/core';
import {MatError, MatFormField} from '@angular/material/form-field';
import {MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login-page',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatError,
    MatButton,
    RouterLink
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit {
  public loginForm!: UntypedFormGroup;
  public registerForm!: UntypedFormGroup;
  private fb = inject(UntypedFormBuilder);

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {
    this.initLoginForm();
    this.initRegisterForm();
  }

  ngOnInit() {}

  initLoginForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  initRegisterForm(){
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
    })
  }

  doLogin() {
    if (this.loginForm.valid) {
      const loginDTO = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.loginService.doLogin(loginDTO).subscribe({
        next: (response: any) => {
          const token = response.token; // Adjust according to your API response structure
          localStorage.setItem('jwtToken', token);  // Save token
          this.router.navigate(['/explore']);
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
    }
  }

  doRegister() {
    if (this.registerForm.valid) {
      const registerDTO = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        fullName: this.registerForm.value.name,
      }

      this.loginService.doRegister(registerDTO).subscribe({
        next: (response: any) => {
          const loginDTO = {
            email: this.registerForm.value.email,
            password: this.registerForm.value.password
          };

          this.loginService.doLogin(loginDTO).subscribe({
            next: (response: any) => {
              const token = response.token;
              localStorage.setItem('jwtToken', token);
              this.router.navigate(['/explore']);
            },
            error: (err) => {
              console.error('Login failed', err);
            }
          })
        },
        error: (err) => {
          console.error('Register failed', err);
        }
      })
    }
  }


}

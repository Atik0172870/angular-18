import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  returnUrl: string = '/';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      account: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });

    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/';
    });
  }



  onSubmit() {
    if (this.loginForm.valid) {
      this.http.post<any>('/api/account/login', this.loginForm.value).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate([this.returnUrl]);
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
    }
  }
}

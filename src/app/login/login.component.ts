import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { IonButton } from '@ionic/angular/standalone';
import { LoginAbstract } from './services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonButton],
  providers: [{ provide: LoginAbstract, useClass: LoginService }],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private router: Router = inject(Router);
  private loginService: LoginAbstract = inject(LoginAbstract);

  ngOnInit(): void {
    this.loginService.getToken().subscribe();
  }

  onLogin(): void {
    this.router.navigate(['/home']);
  }
}

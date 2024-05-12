import { Inject, Injectable, inject } from '@angular/core';
import { AuthService } from '../../shared/api/auth/auth.api.service';
import { Observable, tap } from 'rxjs';
import { BearerTokenType } from '../../shared/api/models/bearer-token.type';
import { DOCUMENT } from '@angular/common';
import { LoginAbstract } from './login.abstract';

@Injectable()
export class LoginService extends LoginAbstract {
  private authService: AuthService = inject(AuthService);

  localStorage: Storage | undefined;
  constructor(@Inject(DOCUMENT) private document: Document) {
    super();
    this.localStorage = this.document.defaultView?.localStorage;
  }

  public getToken(): Observable<BearerTokenType> {
    return this.authService.getToken().pipe(
      tap((data: BearerTokenType): void => {
        if (!this.localStorage || !data.token) return;
        localStorage.setItem('token', data.token);
      })
    );
  }
}

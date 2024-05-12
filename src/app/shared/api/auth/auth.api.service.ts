import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BearerTokenType } from '../models';

@Injectable()
export class AuthService {
  private httpClient: HttpClient = inject(HttpClient);

  public getToken() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        btoa(environment.client_id + ':' + environment.client_secret),
    });

    const body = new HttpParams().set('grant_type', 'client_credentials');

    return this.httpClient
      .post(environment.AUTH, body.toString(), {
        headers,
      })
      .pipe(
        map((data: any): BearerTokenType => {
          return { token: data.access_token }; //Addapter pattern
        }),
        catchError((error: any): Observable<BearerTokenType> => {
          return of({ token: '' });
        })
      );
  }
}

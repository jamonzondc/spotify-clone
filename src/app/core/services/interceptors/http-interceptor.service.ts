import { DOCUMENT } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export const providerHttpInterceptor = () => {
  return {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true,
  };
};

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  localStorage: Storage | undefined;
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.localStorage = this.document.defaultView?.localStorage;
  }
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = this.handleRequest(req);
    return this.handleResponse(authReq, next);
  }

  private handleRequest(req: HttpRequest<any>): HttpRequest<any> {
    if (req.url.endsWith('/token')) return req;

    const token = this.getLocalStorageToken();
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
  }

  private handleResponse(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (
          !(event instanceof HttpResponse) ||
          !event.headers.has('Authorization') ||
          !event.headers.get('Authorization')
        )
          return;
        this.updateLocalStorageToken(event.headers.get('Authorization')!);
      })
    );
  }

  private getLocalStorageToken(): string {
    if (!this.localStorage) return '';
    return localStorage.getItem('token') || '';
  }

  private updateLocalStorageToken(token: string): void {
    if (!this.localStorage) return;
    localStorage.setItem('token', token);
  }
}

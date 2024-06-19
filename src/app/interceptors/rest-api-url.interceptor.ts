import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app-config';

@Injectable()
export class RestApiUrlInterceptor implements HttpInterceptor {
  private baseUrl = AppConfig.apiUrl;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.startsWith('http')) {
      const apiReq = req.clone({ url: `${this.baseUrl}${req.url}` });
      return next.handle(apiReq);
    }

    return next.handle(req);
  }
}

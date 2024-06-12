import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RestApiUrlInterceptor implements HttpInterceptor {
  private baseUrl = 'http://localhost:8081/api/v1';

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.startsWith('http')) {
      // Aggiungi la base URL alla richiesta
      const apiReq = req.clone({ url: `${this.baseUrl}${req.url}` });
      return next.handle(apiReq);
    }

    return next.handle(req);
  }
}

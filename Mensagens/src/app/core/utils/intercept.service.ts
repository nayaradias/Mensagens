import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private router:Router){}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    if (token) {
        request = request.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + token
            }
        })
        return next.handle(request).pipe(
          tap(success=>{

          },err=>{
            if(err.status == 401){
              this.router.navigateByUrl('Auth/login');
            }
          })
        )
    }
    console.log(request);
    return next.handle(request);
  }
}

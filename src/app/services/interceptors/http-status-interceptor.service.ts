import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable()
export class HttpStatusInterceptorService implements HttpInterceptor {

    constructor(private toastr: ToastrService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                console.log(error);
                const errorMessage = error.error.message
                this.toastr.error(errorMessage, error.error.status, {
                    positionClass: 'toast-bottom-left'
                })
                return of([]);
            }),
            map((event: any) => event));
    }
}
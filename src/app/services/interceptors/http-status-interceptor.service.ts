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
                let errorMessage = error.error.message
                console.log(error.status);
                if(error.status == 0){
                    errorMessage = "Unable to connect to the server"
                }
                this.toastr.error(errorMessage, error.error.status, {
                    positionClass: 'toast-bottom-left'
                })
                return of([]);
            }),
            map((event: any) => event));
    }
}
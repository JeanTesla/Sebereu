import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, map, of } from 'rxjs';
import { ToastService } from '../UX/toast.service';

@Injectable()
export class HttpStatusInterceptorService implements HttpInterceptor {

    constructor(private toastService: ToastService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                let errorMessage = error.error.message
                if(error.status == 0){
                    errorMessage = "Unable to connect to the server"
                }
                this.toastService.show(errorMessage)
                return of([]);
            }),
            map((event: any) => event));
    }
}
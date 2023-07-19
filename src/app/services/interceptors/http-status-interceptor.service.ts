import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Injectable()
export class HttpStatusInterceptorService implements HttpInterceptor {

    constructor(private snackBar: MatSnackBar) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {

                const errorMessage = error.error.message
                this.snackBar.open(errorMessage, 'Exit', {
                    horizontalPosition: "right",
                    verticalPosition: "top",
                    duration: 3000
                  });

                return of([]);   // return empty Observable of array 
            }),
            map((event: any) => event));
    }
}
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToastService {

    constructor(
        private snackBar: MatSnackBar
    ) { }

    show(message: string){
        this.snackBar.open(message,"Fechar", {
            duration: 2000,
            horizontalPosition:'end',
            verticalPosition:'top'
        });
    }
}

import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatConfirmDialogComponent} from '../shared/components/mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg: string): MatDialogRef<MatConfirmDialogComponent, any> {
    return this.dialog.open(MatConfirmDialogComponent, {
            width: '390px',
            panelClass: 'confirm-dialog-container',
            disableClose: true,
            position: { top: '10px'},
            data: {
              message: msg
            }
          });
  }

}

import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();

  constructor(private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) {}

  openAddContactDialog() {
    let dialogRef = this.dialog.open(NewContactDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe({
      next: res =>  {
        if (res)
          this.openSnackBar('Contact added', 'Navigate')
          .onAction().subscribe({
            next: () => {
              this.router.navigate(['/contactmanager', res.id]);
            }
          });
       }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(message, action, 
      {duration: 5000});
  }

}

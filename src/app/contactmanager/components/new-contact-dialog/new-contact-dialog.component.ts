import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {

  user!: User;

  avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4'];

  constructor(
    private dialogRef: MatDialogRef<NewContactDialogComponent>,
    private userService: UserService) {}

  name = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a name' : '';
  }

  ngOnInit(): void {
     this.user = {
      id: 0,
      avatar: '',
      bio: '',
      name: '',
      notes: [],
      birthDate: new Date()
     }
  }

  save() {
    this.user.name = String(this.name.value);
    this.userService.addUser(this.user).subscribe({
      next: data => this.dialogRef.close(data)
    });
    
  }

  dismiss() {
    this.dialogRef.close(null);
  }
}

import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-admin-booking-dialog',
  imports: [FormsModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatButtonModule],
  templateUrl: './admin-booking-dialog.html',
  styleUrl: './admin-booking-dialog.scss',
})
export class AdminBookingDialog {

  constructor(public dialogRef: MatDialogRef<AdminBookingDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  isViewMode = false;

  ngOnInit(): void {
    this.isViewMode = this.data?.isViewMode || false;
  }
    
  save(): void {
    this.dialogRef.close(this.data);
  }

  close(): void {
    this.dialogRef.close();
  }
}

import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog',
  imports: [ 
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule
    ],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
})
export class Dialog {

  constructor(
    public dialogRef: MatDialogRef<Dialog>, @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.data.image = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  save(): void {
    this.dialogRef.close(this.data);
  }

  close() : void {
    this.dialogRef.close();
  }
} 

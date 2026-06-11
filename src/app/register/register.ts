import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Sportservice } from '../sportservice';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from "@angular/material/form-field";

function passwordMatching(control: AbstractControl): ValidationErrors | null {

  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, MatSnackBarModule, MatIconModule, MatFormFieldModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  testRegister: string = 'test-class';
  isDisabled: boolean = true;
  submitted: boolean = false;

  sportservice = inject(Sportservice);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  registerForm = new FormGroup(
    {
      name: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[a-zA-Z ]+$')
        ]
      }),

      phone: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ]
      }),

      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.email
        ]
      }),

      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).+$')
        ]
      }),

      confirmPassword: new FormControl('', {
        validators: [Validators.required]
      })
    },
    {
      validators: passwordMatching
    }
  );

  onRegister(): void {

    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);

    const data = this.registerForm.value;

    //Get existing users
    const sportUsers = this.get('sportUsers') || [];

    const emailExists = sportUsers.some((user: any) => user.email === data.email);

    // Checks if email exists
    if (emailExists) {
      this.snackBar.open(
        'Email already exists!', 'Close',{
          duration: 3000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }
      )
      // alert('Email already exists!');
      return;
    }

    //Add new data
    sportUsers.push(data);

    // Save updated users
    this.set('sportUsers', sportUsers);

    console.log('Before success snackbar');

    const snackRef = this.snackBar.open('Registered Sucessfully', 'Close', {
      duration: 1000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });

    console.log('After success snackbar');

    // alert("Registered successfully!");

    console.log(this.get('sportUsers'));

    //Reset form
    this.registerForm.reset();

    // Reset submitted form
    this.submitted = false;

    snackRef.afterDismissed().subscribe(() => {
      this.router.navigate(['/login']);

    })
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    const user = localStorage.getItem(key);
    return user ? JSON.parse(user) : null;
  }

  // testsnackbar() {
  //   this.snackBar.open('snackbar working!', 'Close', {
  //     duration: 3000
  //   })
  // }
}

import { Component, OnInit, Input } from '@angular/core';

// using this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// using this import to bring in the API calls
import { UserRegistrationService } from '../fetch-api-data.service';

// using this import to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  /**
   * called when using an instance of class
   * @param fetchApiData
   * @param dialogRef
   * @param snackBar
   */

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  /**
   * Function for sending the form inputs to the backend to create a new user
   * @returns alert indicating a successful registration or an error
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        // logic for a successful user registration goes here! (to be implemented)
        console.log(result);
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token', result.token)
        this.dialogRef.close(); // this will close the modal on success!
        this.snackBar.open('User login successful', 'OK', {
          duration: 2000,
        });
        this.router.navigate([ 'movies' ]);
      },
      (result) => {
        console.log(result);
        this.snackBar.open('User login Failed', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}

import { Component, OnInit, Input } from '@angular/core';

// using this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// using this import to bring in the API calls
import { UserRegistrationService } from '../fetch-api-data.service';

// using this import to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.css'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * called when using an instance of class
   * @param fetchApiData
   * @param dialogRef
   * @param snackBar
   */

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  /**
   * Function for sending the form inputs to the backend to create a new user
   * @returns alert indicating a successful registration or an error
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        // logic for a successful user registration goes here! (to be implemented)
        console.log(result);
        this.dialogRef.close(); // this will close the modal on success!
        this.snackBar.open('User registration successful', 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        console.log(result)
        this.snackBar.open('User registration successful', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}

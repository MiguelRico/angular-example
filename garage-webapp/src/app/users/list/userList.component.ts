import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {User} from './../user';
import {UserService} from './../user.service';

import {FormArray, FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './userList.component.html',
  styleUrls: ['./userList.component.css']
})
export class UserListComponent implements OnInit {
  submitted: boolean;
  user: any;
  userList: User[];
  selectedUser: User;
  userForm: FormGroup;
  newUser: User;

  formErrors = {
    'general': ''
  };

  validationMessages = {
    'general': 'Dni, Name and Telephone are required.'
  };

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
     this.createForm();
  }

  createForm() {
     this.userForm = this.fb.group({
       newId: '',
       newDni: ['', Validators.required],
       newName: ['', Validators.required],
       newAddress: [''],
       newTelephone: ['', Validators.required],
       users: this.fb.array([])
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().then(users => this.setUsers(users));
  }

  setUsers(users: User[]): void {
    this.userList = users;
    const usersFGs = this.userList.map(user => this.fb.group(user));
    const usersFormArray = this.fb.array(usersFGs);
    this.userForm.setControl('users', usersFormArray);
  }

  reloadUsers() {
    this.getUsers();
  }

  get users(): FormArray {
    return this.userForm.get('users') as FormArray;
  };

  createUser(): void {
    if (this.userForm.status !== 'INVALID') {
      const user = this.userForm;
      const lastIndex = this.users.at(this.users.length - 1).get('id').value;
      this.selectedUser = new User(lastIndex + 1, user.get('newDni').value, user.get('newName').value, user.get('newAddress').value, user.get('newTelephone').value);
      this.userService.create(this.selectedUser).then(response => this.clearCreateCar());
    } else {
      this.formErrors.general = this.validationMessages.general;
    }
  }

  clearCreateCar(): void {
    this.userForm.get('newId').setValue('');
    this.userForm.get('newDni').setValue('');
    this.userForm.get('newName').setValue('');
    this.userForm.get('newAddress').setValue('');
    this.userForm.get('newTelephone').setValue('');
    this.reloadUsers();
    this.onValueChanged();
  }

  gotoDetail(index: number): void {
    const user = this.users.at(index);
    this.selectedUser = new User(user.get('id').value, user.get('dni').value, user.get('name').value, user.get('address').value, user.get('telephone').value);
    this.router.navigate(['users/usermanager', this.selectedUser.id]);
  }
}

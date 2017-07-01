import { Car } from '../../cars/car';
import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';

import {User} from './../user';
import {UserService} from './../user.service';

import 'rxjs/add/operator/toPromise';

import {CarService} from './../../cars/car.service';
import {FormArray, FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-manager',
  templateUrl: './userManager.component.html',
  styleUrls: ['./userManager.component.css'],
  providers: [CarService]
})
export class UserManagerComponent implements OnInit {

  userForm: FormGroup;
  user: User;

  formErrors = {
    'dni': '',
    'name': '',
    'telephone': '',
    'general': ''
  };
  validationMessages = {
    'dni': {
      'required': 'Dni is required.'
    },
    'name': {
      'required': 'Name is required.'
    },
    'telephone': {
      'required': 'Telephone is required.'
    },
    'general': 'Dni, Name and Telephone are required.'
  };

  constructor(private fb: FormBuilder, private userService: UserService, private carService: CarService,
    private route: ActivatedRoute, private location: Location) {
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      id: '',
      dni: ['', Validators.required],
      name: ['', Validators.required],
      address: '',
      telephone: ['', Validators.required],
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
    this.route.params.switchMap((params: Params) => this.userService.getUser(+params['id'])).subscribe(user => this.user = user);
  }

  update(): void {
     if (this.userForm.status !== 'INVALID') {
       this.userService.update(this.user).then(() => this.goBack());
     } else {
       this.formErrors.general = this.validationMessages.general;
     }
  }

  delete(): void {
    this.userService.delete(this.user.id).then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}

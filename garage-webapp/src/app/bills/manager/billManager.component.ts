import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

import {ActivatedRoute, Params} from '@angular/router';

import {FormArray, FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

import {Bill} from './../bill';
import {BillService} from './../bill.service';

import {User} from './../../users/user';
import {UserService} from './../../users/user.service';

import {Car} from './../../cars/car';
import {CarService} from './../../cars/car.service';

import {Concept} from './../../concepts/concept';
import {ConceptService} from './../../concepts/concept.service';

@Component({
  selector: 'app-bill-manager',
  templateUrl: './billManager.component.html',
  styleUrls: ['./billManager.component.css'],
  providers: [BillService, UserService, CarService, ConceptService]
})
export class BillListComponent implements OnInit {
  billForm: FormGroup;
  selectedUser: number;
  users: User[];
  selectedCar: Car;
  cars: Car[];
  selectedConcept: Concept;
  concepts: Concept[];
  amount: number;

  formErrors = {
    'single': ''
  };
  validationMessages = {
    'single': 'User, Car, Concept and Amount are required.'
  };

  constructor(private fb: FormBuilder, private billService: BillService, private userService: UserService, private carService: CarService,
    private conceptService: ConceptService, private router: Router, private location: Location) {
    this.createForm();
  }

  createForm() {
     this.billForm = this.fb.group({
      selectedUser: ['', Validators.required],
      selectedCar: ['', Validators.required],
      selectedConcept: ['', Validators.required],
      amount: ['', Validators.required]
    });

    this.billForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.billForm) { return; }
    const form = this.billForm;

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
    this.userService.getUsers().then(users => this.users = users);
    this.conceptService.getConcepts().then(concepts => this.concepts = concepts);
  }

  onChangeUser(userId: number) {
    this.carService.getCarsByUser(userId).then(cars => this.cars = cars);
  }

  createBill() {
    if (this.billForm.status !== 'INVALID') {
      const lastIndex = this.users[this.users.length - 1].id;
      const bill = new Bill(lastIndex + 1, this.selectedUser, this.selectedCar.id, this.selectedConcept.id, this.amount);
      this.billService.create(bill).then(response => this.goBack());
    } else {
      this.formErrors.single = this.validationMessages.single;
    }
  }

  goBack(): void {
    this.router.navigate(['dashboard']);
  }
}

import { UserService } from '../../users/user.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute, Params} from '@angular/router';

import {Location} from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import {FormArray, FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

import {Car} from './../car';
import {CarService} from './../car.service';
import {User} from './../../users/user';

@Component({
  selector: 'app-car-list',
  templateUrl: './carList.component.html',
  styleUrls: ['./carList.component.css']
})
export class CarListComponent implements OnInit {
  carForm: FormGroup;
  userId: number;
  carList: Car[];
  selectedCar: Car;

  showCarUpdated = false;

  formErrors = {
    'model': '',
    'enrollment': '',
    'general': '',
    'single': '',
    'carUpdated': ''
  };

  validationMessages = {
    'dni': {
      'required': 'Model is required.'
    },
    'enrollment': {
      'required': 'Enrollment is required.'
    },
    'general': 'Model and Enrollment are required.',
    'single': 'Model and Enrollment are required for update.',
    'carUpdated': 'Updated car.'
  };

  constructor(private fb: FormBuilder, private userService: UserService, private carService: CarService,
    private route: ActivatedRoute, private location: Location) {
    this.createForm();
  }

  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => this.userService.getUser(+params['id'])).subscribe(user => this.setUser(user));
  }

  createForm() {
     this.carForm = this.fb.group({
      id: '',
      user: '',
      newModel: ['', Validators.required],
      newEnrollment: ['', Validators.required],
      cars: this.fb.array([]),
    });

    this.carForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.carForm) { return; }
    const form = this.carForm;

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

  setUser(user: User) {
    this.userId = user.id;
    this.reloadCars();
  }

  reloadCars() {
    this.carService.getCarsByUser(this.userId).then(response => this.setCars(response));
    this.showCarUpdated = false;
  }

  setCars(cars: Car[]) {
    this.carList = cars;
    const carsFGs = this.carList.map(car => this.fb.group(car));
    const carsFormArray = this.fb.array(carsFGs);
    this.carForm.setControl('cars', carsFormArray);
  }

  get cars(): FormArray {
    return this.carForm.get('cars') as FormArray;
  };

  createCar(): void {
    if (this.carForm.status !== 'INVALID') {
      const car = this.carForm;
      let lastIndex = 0;
      if (this.cars.length !== 0) {
        lastIndex = this.cars.at(this.cars.length - 1).get('id').value;
        lastIndex += 1;
      }
      this.selectedCar = new Car(lastIndex, this.userId, car.get('newModel').value, car.get('newEnrollment').value);
      this.carService.create(this.selectedCar).then(response => this.clearCreateCar());
    } else {
      this.formErrors.general = this.validationMessages.general;
    }
  }

  clearCreateCar(): void {
    this.carForm.get('id').setValue('');
    this.carForm.get('user').setValue('');
    this.carForm.get('newModel').setValue('');
    this.carForm.get('newEnrollment').setValue('');
    this.reloadCars();
  }

  updateCar(index: number): void {
    const car = this.cars.at(index);
    this.selectedCar = new Car(car.get('id').value, car.get('user').value, car.get('model').value, car.get('enrollment').value);
    if (this.selectedCar.model !== '' && this.selectedCar.enrollment !== '') {
      this.carService.update(this.selectedCar).then(response => this.reloadCars());
      this.showCarUpdated = true;
      this.formErrors.carUpdated = this.validationMessages.carUpdated;
    } else {
      this.formErrors.single = this.validationMessages.single;
    }
  }

  deleteCar(id: number): void {
    this.carService.delete(id).then(response => this.reloadCars());
  }

}

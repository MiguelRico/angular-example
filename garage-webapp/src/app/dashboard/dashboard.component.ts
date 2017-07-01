import {Component, OnInit} from '@angular/core';

import {Bill} from './../bills/bill';
import {BillService} from './../bills/bill.service';
import {UserService} from './../users/user.service';
import {CarService} from './../cars/car.service';
import {ConceptService} from './../concepts/concept.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [BillService, UserService, CarService, ConceptService]
})
export class DashboardComponent implements OnInit {

  bills: Bill[] = [];

  constructor(private billService: BillService, private userService: UserService, private carService: CarService, private conceptService: ConceptService) {}

  ngOnInit(): void {
    this.billService.getBills().then(bills => this.setBillValues(bills));
  }

  setBillValues(bills: Bill[]) {
    this.bills = bills;
    for (let index = 0; index < this.bills.length; index++) {
      this.userService.getUser(this.bills[index].user).then(user => this.bills[index].userValue = user.name);
      this.carService.getCar(this.bills[index].car).then(car => this.bills[index].carValue = car.model);
      this.conceptService.getConcept(this.bills[index].concept).then(concept => this.bills[index].conceptValue = concept.name);
    }
  }
}

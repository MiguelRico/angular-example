import {Concept} from './../concepts/concept';

export class Bill {
  id: number;
  user: number;
  userValue: string;
  car: number;
  carValue: string;
  concept: number;
  conceptValue: string;
  amount: number;

  constructor(id: number, user: number, car: number, concept: number, amount: number) {
    this.id = id;
    this.user = user;
    this.car = car;
    this.concept = concept;
    this.amount = amount;
  }
}

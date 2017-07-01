import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Bill} from './bill';

@Injectable()
export class BillService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private billsUrl = 'api/bills';  // URL to web api
  private billsValues = {};

  constructor(private http: Http) {}

  getBills(): Promise<Bill[]> {
    return this.http.get(this.billsUrl)
      .toPromise()
      .then(response => response.json().data as Bill[])
      .catch(this.handleError);
  }

  getBill(id: number): Promise < Bill > {
    const url = '${this.billsUrl}/${id}';
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Bill)
      .catch(this.handleError);
  }

  delete(id: number): Promise < void > {
    const url = '${this.billsUrl}/${id}';
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(bill: Bill): Promise < Bill > {
    return this.http
      .post(this.billsUrl, JSON.stringify(bill), {headers: this.headers})
      .toPromise()
      .then(() => bill)
      .catch(this.handleError);
  }

  update(bill: Bill): Promise < Bill > {
    const url = '${this.billsUrl}/${bill.id}';
    return this.http
      .put(url, JSON.stringify(bill), {headers: this.headers})
      .toPromise()
      .then(() => bill)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise < any > {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}


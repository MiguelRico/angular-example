import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Concept} from './concept';

@Injectable()
export class ConceptService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private conceptsUrl = 'api/concepts';  // URL to web api

  constructor(private http: Http) {}

  getConcepts(): Promise<Concept[]> {
    return this.http.get(this.conceptsUrl)
      .toPromise()
      .then(response => response.json().data as Concept[])
      .catch(this.handleError);
  }

  getConcept(id: number): Promise<Concept> {
    const url = `${this.conceptsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Concept)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}


import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Rx";
import { SessionService } from "./session.service";

@Injectable()
export class PlannerService {
  BASE_URL: string = "http://localhost:3000";
  options: object = { withCredentials: true };
  currentPlan:any;
  constructor(private http: Http) {}
  
  getPlan(id) {
    return this.http
      .get(`${this.BASE_URL}/api/trips/${id}`, this.options)
      .map(res => {
        this.currentPlan = res.json();
        return res.json();
      })
      .catch(this.handleError);
  }

  getVisits(tripID, cityID) {
    return this.http
      .get(`${this.BASE_URL}/api/visits/${cityID}`, this.options)
      .map(res => {
        return res.json();
      })
      .catch(this.handleError);
  }
  handleError(e) {
    console.log(e);
    return Observable.throw(e.json().message);
  }
}

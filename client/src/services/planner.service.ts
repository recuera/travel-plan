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

  getVisits(tripID, dayPos) {
    return this.http
      .get(`${this.BASE_URL}/api/visits/${tripID}/${dayPos}`, this.options)
      .map(res => {
        return res.json();
      })
      .catch(this.handleError);
  }

  saveTripVisit(tripID, cityID, dayPos, dateRange, visitID, visitData){
    console.log(tripID, cityID, dayPos, dateRange, visitID, visitData)
    return this.http
     .post(`${this.BASE_URL}/api/visits/save`, {tripID, cityID, dayPos, dateRange, visitID, visitData}, this.options)
      .map(res => {
        console.log(res)
        return res.json();
      })
      .catch(this.handleError);
  }

  updateTripVisit(tripID, tripVisitID, dayPos){
    console.log(tripID, tripVisitID, dayPos)
    return this.http
     .put(`${this.BASE_URL}/api/visits/update`, {tripVisitID, dayPos}, this.options)
      .map(res => {
        console.log(res)
        return res.json();
      })
      .catch(this.handleError);
  }

  searchPlace(cityID,place){
    console.log(cityID,place)
    return this.http
    .get(`${this.BASE_URL}/api/visits/search/${cityID}/${place}`, this.options)
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

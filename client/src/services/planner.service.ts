import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Rx";
import { SessionService } from "./session.service";
import { Subject } from "rxjs/Subject";

@Injectable()
export class PlannerService {
  BASE_URL: string = "http://localhost:3000";
  options: object = { withCredentials: true };
  currentPlan:any;

  // Reload the days:
  // Observable string sources
  private missionAnnouncedSource = new Subject<string>();
  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();

  announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission);
  }

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
      .get(`${this.BASE_URL}/api/visits/get/${tripID}/${dayPos}`, this.options)
      .map(res => {
        return res.json();
      })
      .catch(this.handleError);
  }

  getTopVisits(cityID){
    return this.http
      .get(`${this.BASE_URL}/api/visits/getTop/${cityID}`, this.options)
      .map(res => {
        return res.json();
      })
      .catch(this.handleError);
  }
  
  saveTripVisit(tripID, cityID, dayPos, dateRange, visitID, visitData){
    return this.http
     .post(`${this.BASE_URL}/api/visits/save`, {tripID, cityID, dayPos, dateRange, visitID, visitData}, this.options)
      .map(res => {
        this.announceMission("update")
        return res.json();
      })
      .catch(this.handleError);
  }

  updateTripVisit(tripID, tripVisitID, dayPos){
    return this.http
     .put(`${this.BASE_URL}/api/visits/update`, {tripVisitID, dayPos}, this.options)
      .map(res => {
        return res.json();
      })
      .catch(this.handleError);
  }

  searchPlace(cityID,place){
    return this.http
    .get(`${this.BASE_URL}/api/visits/search/${cityID}/${place}`, this.options)
      .map(res => {
        return res.json();
      })
      .catch(this.handleError);
  }

  deleteVisit(id){
    return this.http
    .get(`${this.BASE_URL}/api/visits/delete/${id}`, this.options)
      .map(res => {
        this.announceMission("update")
        return res.json();
      })
      .catch(this.handleError);
  }

  handleError(e) {
    console.log(e);
    return Observable.throw(e.json().message);
  }
}

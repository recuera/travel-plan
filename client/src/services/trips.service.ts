import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Rx";
import { SessionService } from './session.service';



@Injectable()
export class TripsService {
  BASE_URL: string = "http://localhost:3000";
  options:object = {withCredentials:true};

  constructor(
    private http: Http
  ){}

  getTrips() {
    return this.http.get(`${this.BASE_URL}/api/trips`, this.options)
                    .map(res => {
                      console.log(res.json())
                     return res.json()
                    })
                    .catch(this.handleError);
  }
  newTrip(_author,title,content){
    let city;
    let start;
    let end;
    return this.http
    .post(`${this.BASE_URL}/api/trips`, {city,start,end}, this.options)
    .map(res => res.json())
    .catch(this.handleError);
  }

  handleError(e) {
    console.log(e)
    return Observable.throw(e.json().message);
  }
}
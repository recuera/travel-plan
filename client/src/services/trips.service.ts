import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Rx";
import { SessionService } from './session.service';
import { environment } from "../environments/environment"


@Injectable()
export class TripsService {
  BASE_URL: string = environment.BASEURL;
  options:object = {withCredentials:true};

  constructor(
    private http: Http
  ){}

  getTrips() {
    return this.http.get(`${this.BASE_URL}/api/trips`, this.options)
                    .map(res => {
                     return res.json()
                    })
                    .catch(this.handleError);
  }

  newTrip(country, city,start,end){
    return this.http
    .post(`${this.BASE_URL}/api/trips`, {country,city,start,end}, this.options)
    .map(res => res.json())
    .catch(this.handleError);
  }

  handleError(e) {
    console.log(e)
    return Observable.throw(e.json().message);
  }
}
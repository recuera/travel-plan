import { Component, OnInit } from '@angular/core';
import { COUNTRIES } from "../../interfaces/COUNTRIES";
import { cities } from "../../interfaces/CITIES";
import { TripsService } from '../../services/trips.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trips-new',
  templateUrl: './trips-new.component.html',
  styleUrls: ['./trips-new.component.scss']
})
export class TripsNewComponent implements OnInit {

  countryList = Object.keys(COUNTRIES);
  countryID;
  cityList;
  country;
  city;
  start;
  end;
  error;
  constructor(private tripService:TripsService, private router: Router) { }

  ngOnInit() {
  }
  updateCities(){
    this.cityList = undefined;
    this.error = undefined;
    this.countryID = COUNTRIES[this.country]
    if(cities[this.countryID]){
      this.cityList =  Object.keys(cities[this.countryID]);
    } else{
      this.error = "Please select another country"
    }
  }
  newTrip(){
    this.tripService
      .newTrip(this.country,this.city, this.start, this.end)
      .subscribe(data => this.router.navigate(["trips"]), err => (this.error = err));
  }
}

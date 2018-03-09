import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlannerService } from '../../services/planner.service';
import { durationColors } from "../../interfaces/duration-colors";
import { GoogleMapsAPIWrapper, AgmMap, LatLngBounds, LatLngBoundsLiteral} from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

declare var google: any;

@Component({
  selector: 'app-agm-map',
  templateUrl: './agm-map.component.html',
  styleUrls: ['./agm-map.component.scss']
})
export class AgmMapComponent implements OnInit {
  private _visits;
  private _plan;
  storeMap;
  lat: number;
  lng: number;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public planner: PlannerService,
  ) { }

  ngOnInit() {
  }
  get visits(): any {
    return this._visits
    this.findVisitsBounds()
  }
  get plan(): any {
    return this._plan
  }


  @Input()
  set visits(visits) {
    this._visits = visits;
    
  }
  @Input()
  set plan(plan) {
    this._plan = plan;
  }
  
  public storeMapReady(map){
    console.log("ready!")
    this.storeMap = map;
    google.maps.event.addListener(map, 'bounds_changed', function() { 
      console.log("event listener!")
      this.setZoom(Math.min(17, this.getZoom())); 
    });
    if(this.visits.length == 0){
      this.storeMap.setCenter(this.plan.location)
      this.storeMap.setZoom(17);
    }
    else if (this.visits.length > 0){
      this.storeMap.fitBounds(this.findVisitsBounds());
    }
  }

  public findVisitsBounds(){
      let bounds:LatLngBounds = new google.maps.LatLngBounds();
      for(let visit of this.visits){
        console.log(visit)
        bounds.extend(new google.maps.LatLng(visit.visit_id.location.lat, visit.visit_id.location.lng));
      }
      return bounds;
  }

  public getIcon(sec){
    let num = 7200
    if(sec < 7200 ){
      num = 7200;
    } else if(sec < 10800 ){
      num = 10800;
    } else if(sec < 14400 ){
      num = 14400;
    } else if(sec < 18000 ){
      num = 18000;
    } else{
      num = 21600;
    }
    return `../../assets/img/marker-${num}.png`
  }


}

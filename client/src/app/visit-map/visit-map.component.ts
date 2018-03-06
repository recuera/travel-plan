import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlannerService } from '../../services/planner.service';
import { durationColors } from "../../interfaces/duration-colors";
import { GoogleMapsAPIWrapper, AgmMap, LatLngBounds, LatLngBoundsLiteral} from '@agm/core';
declare var google: any;

@Component({
  selector: 'app-visit-map',
  templateUrl: './visit-map.component.html',
  styleUrls: ['./visit-map.component.scss']
})
export class VisitMapComponent implements OnInit {
  plan;
  tripID;
  cityID;
  visits;
  dayPos:number = 0;
  title: string = 'My first AGM project';
  lat: number;
  lng: number;
  storeMap


  constructor(    
    public router: Router,
    public route: ActivatedRoute,
    public planner: PlannerService,
  ) { }

  ngOnInit() {
    this.getVisits();
    this.route.params.subscribe( params => {
      this.tripID = params["id"];
      this.getPlan(this.tripID)
    })
  }

  getPlan(id){
    this.planner.getPlan(id).subscribe( res => {
      this.plan = res;
      this.cityID = res.city.id;
      this.lat = res.location.lat;
      this.lng = res.location.lng;
    })
  }
  getVisits(){
    this.route.params.subscribe( params => {
      this.planner.getVisits(params["id"], this.dayPos).subscribe( res => {
        this.visits = res
        if(this.visits.length > 0){
          this.storeMap.fitBounds(this.findVisitsBounds());
        }
      })
    })
  }
  
  public storeMapReady(map){
      this.storeMap = map;
  }

  public findVisitsBounds(){
      let bounds:LatLngBounds = new google.maps.LatLngBounds();
      for(let visit of this.visits){
        bounds.extend(new google.maps.LatLng(visit.visit_id.location.lat, visit.visit_id.location.lng));
      }
      return bounds;
  }

  getDayRoute(dayPos){
    this.dayPos = dayPos;
    this.getVisits()
  }

  getHeight(sec){
    return ((sec/ 3600) * 40) + "px"
  }
  getBackground(sec){
    if(sec < 7200 ){
      return durationColors["7200"]
    } else if(sec < 10800 ){
      return durationColors["10800"]
    } else if(sec < 14400 ){
      return durationColors["14400"]
    } else if(sec < 18000 ){
      return durationColors["18000"]
    } else{
      return durationColors["21600"]
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlannerService } from '../../services/planner.service';

@Component({
  selector: 'app-visit-map',
  templateUrl: './visit-map.component.html',
  styleUrls: ['./visit-map.component.scss']
})
export class VisitMapComponent implements OnInit {
  plan;
  tripID;
  cityID;
  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(    
    public router: Router,
    public route: ActivatedRoute,
    public planner: PlannerService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.tripID = params["id"];
      this.getPlan(this.tripID)
    })
  }
  getPlan(id){
    this.planner.getPlan(id).subscribe( res => {
      this.plan = res;
      this.cityID = res.city.id;
    })
  }

}

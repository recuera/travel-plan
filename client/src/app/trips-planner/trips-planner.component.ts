import { Component, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlannerService } from '../../services/planner.service';

@Component({
  selector: 'app-trips-planner',
  templateUrl: './trips-planner.component.html',
  styleUrls: ['./trips-planner.component.scss']
})
export class TripsPlannerComponent implements OnInit {
  plan;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public planner: PlannerService
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => this.getPlan(params["id"]))
  }

  getPlan(id){
    this.planner.getPlan(id).subscribe( plan => {
      this.plan = plan;
      return plan;
    })
  }
}
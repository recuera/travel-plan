import { Component, OnInit, Input } from '@angular/core';
import { PlannerService } from '../../services/planner.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.scss']
})
export class VisitListComponent implements OnInit {
  
  visits
  constructor( 
    public planner: PlannerService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => this.getVisits(params["id"]))
  }

  getVisits(id){
    console.log(id)
    this.planner.getVisits(id).subscribe( visits => this.visits = visits)
  }

}

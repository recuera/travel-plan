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
  item
  

  private _dayPos = 0;
  
  constructor( 
    public planner: PlannerService,
    public router: Router,
    public route: ActivatedRoute
  ) { 

  }
  get dayPos(): any {
    return this._dayPos
  }

  @Input()
  set dayPos(dayPos) {
    this._dayPos = dayPos;
  }

  ngOnInit() {
    this.getVisits()
  }

  getVisits(){
    console.log(this.dayPos)
    this.route.params.subscribe( params => {
      this.planner.getVisits(params["id"], this.dayPos.index).subscribe( res => {this.visits = res
        console.log(this.visits)
      })
    })
  }
  getHeight(seconds){
    console.log(seconds)
    return ((seconds / 3600) * 40) + "px"
  }

}

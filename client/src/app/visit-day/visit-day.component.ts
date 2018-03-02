import { Component, OnInit, Input } from '@angular/core';
import { PlannerService } from '../../services/planner.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visit-day',
  templateUrl: './visit-day.component.html',
  styleUrls: ['./visit-day.component.scss']
})
export class VisitDayComponent implements OnInit {

  visits
  private _day:Date;
  
  constructor ( 
    public planner: PlannerService,
    public router: Router,
    public route: ActivatedRoute  
  ){ 

  }
  get day(): Date {
    return this._day
  }

  @Input()
  set day(day: Date) {
    this._day = day;
    console.log(day)
  }

  ngOnInit() {
  }

  getVisits(){
    this.route.params.subscribe( params => {
      this.planner.getVisits(params["id"],this.day).subscribe( res => {this.visits = res
      console.log(this.visits)
    })})
  }
}

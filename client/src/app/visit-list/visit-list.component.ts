import { Component, OnInit, Input } from '@angular/core';
import { PlannerService } from '../../services/planner.service';
import { Router, ActivatedRoute } from '@angular/router';
import { durationColors } from "../../interfaces/duration-colors";
import { Subscription }   from 'rxjs/Subscription';

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
    this.subscription = planner.missionAnnounced.subscribe(
      mission => {
        this.getVisits()
    });
  }
  get dayPos(): any {
    return this._dayPos
  }

  @Input()
  set dayPos(dayPos) {
    this._dayPos = dayPos;
  }
  subscription: Subscription;

  ngOnInit() {
    this.getVisits()
  }

  getVisits(){
    this.route.params.subscribe( params => {
      this.planner.getVisits(params["id"], this.dayPos.index).subscribe( res => {this.visits = res
      })
    })
  }
  
  deleteVisit(id){
    console.log(`Delete visit ${id}`)
    this.planner.deleteVisit(id).subscribe( res => console.log(res))
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

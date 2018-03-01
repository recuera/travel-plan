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
  //@Input() cityID: number;
  private _cityID = 0;
  
  constructor( 
    public planner: PlannerService,
    public router: Router,
    public route: ActivatedRoute
  ) { 

  }
  get cityID(): number {
    return this._cityID
  }

  @Input()
  set cityID(cityID: number) {
    this._cityID = cityID;

    console.log("on set")
    this.getVisits()
  }




  ngOnInit() {
    console.log("on init")
    console.log(this.cityID);
    console.log(this._cityID);

  }

  getVisits(){
    this.route.params.subscribe( params => {
      //setTimeout(() => console.log(this.cityID), 1000)
      this.planner.getVisits(params["id"],this.cityID).subscribe( res => {this.visits = res
      console.log(this.visits)
    })})
  }

}

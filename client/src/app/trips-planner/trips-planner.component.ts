import { Component, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlannerService } from '../../services/planner.service';
import { DragulaService } from 'ng2-dragula';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trips-planner',
  templateUrl: './trips-planner.component.html',
  styleUrls: ['./trips-planner.component.scss']
})
export class TripsPlannerComponent implements OnInit {
  plan;
  cityID;
  items;
  tripID;
  place:string;
  resultPlaces: Array<any>;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public planner: PlannerService,
    private dragulaService: DragulaService,
    public forms: FormsModule
  )  {
    dragulaService.drag.subscribe((value) => {
    //  console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
    //  console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
    //  console.log(`over: ${value[0]}`);
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
    //  console.log(`out: ${value[0]}`);
      this.onOut(value.slice(1));
    })
  }

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
  searchPlace(){
    this.planner.searchPlace(this.cityID,this.place).subscribe( res =>{
      console.log(res)
      this.resultPlaces = res;
    });
  }
  private onDrag(args) {
    let [e, el] = args;
    console.log(this.plan)

  }
  
  private onDrop(args) {
    let [e, el] = args;
    let visitID = e.id;
    if (!visitID){ visitID = e.childNodes[1].id};
    this.planner.updateTripVisit(this.tripID,visitID,el.id).subscribe();
  }
  
  private onOver(args) {
    let [e, el, container] = args;
    // do something
  }
  
  private onOut(args) {
    let [e, el, container] = args;
    // do something
  }

  getHeight(seconds){
    return ((seconds / 3600) * 40) + "px"
  }
  
}

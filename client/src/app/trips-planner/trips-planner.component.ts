import { Component, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlannerService } from '../../services/planner.service';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-trips-planner',
  templateUrl: './trips-planner.component.html',
  styleUrls: ['./trips-planner.component.scss']
})
export class TripsPlannerComponent implements OnInit {
  plan;
  cityID;
  items
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public planner: PlannerService,
    private dragulaService: DragulaService
  )  {
    dragulaService.drag.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      console.log(`over: ${value[0]}`);
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      console.log(`out: ${value[0]}`);
      this.onOut(value.slice(1));
    })
  }

  ngOnInit() {
    this.route.params.subscribe( params => this.getPlan(params["id"]))
  }

  getPlan(id){
    this.planner.getPlan(id).subscribe( res => {
      this.plan = res;
      this.cityID = res.city.id;
    })
    console.log(this.items)
  }
  private onDrag(args) {
    let [e, el] = args;
  }
  
  private onDrop(args) {
    let [e, el] = args;
    console.log(args)
  }
  
  private onOver(args) {
    let [e, el, container] = args;
    // do something
  }
  
  private onOut(args) {
    let [e, el, container] = args;
    // do something
  }
}

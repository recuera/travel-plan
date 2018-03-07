import { Component, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlannerService } from '../../services/planner.service';
import { DragulaService } from 'ng2-dragula';
import { FormsModule } from '@angular/forms';
import { durationColors } from "../../interfaces/duration-colors";
import { SessionService } from '../../services/session.service';

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
  resultPlaces: Array<any> = [];
  noResult:string;
  topVisits: Array<any> ;
  user

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public planner: PlannerService,
    private dragulaService: DragulaService,
    public forms: FormsModule,
    public session: SessionService
  )  {
    this.session.getUserEvent().subscribe(user => this.user = user)
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
      
    //  this.getTopVisits(this.cityID); //<-- Descomentar esto al final
    })
  }

  getTopVisits(cityID){
    this.planner.getTopVisits(cityID).subscribe(
      res => {
        this.topVisits = res
        console.log(this.topVisits)
      }
    );
  }

  searchPlace(){
    this.planner.searchPlace(this.cityID,this.place).subscribe( res =>{
      if(res.length >0){
        this.noResult = null;
        this.resultPlaces = res;
      }
      else{
        this.noResult = "No place found, sorry!"
      }
    });
  }
  private onDrag(args) {
    let [e, el] = args;
  }
  
  private onDrop(args) {
    let [e, el, container] = args;
    if(this.user._id != this.plan.author_id){
      return;
    }
    let visitID = e.id;
    if (!visitID){ visitID = e.childNodes[1].id};
    if(container.id != "topResults" && container.id != "searchResults"){
      this.planner.updateTripVisit(this.tripID,visitID,el.id).subscribe();
    }
    else {
      let visitID = container.id == "searchResults" ? this.resultPlaces[e.id].id : this.topVisits[e.id].id;
      let visitData = container.id == "searchResults" ? this.resultPlaces[e.id] : this.topVisits[e.id];
      let dateRange = [
        new Date(this.plan.dates[0]).toISOString().slice(0, 10),
        new Date(this.plan.dates[this.plan.dates.length -1]).toISOString().slice(0, 10)
      ]
    
      this.planner.saveTripVisit(this.tripID,this.cityID, el.id, dateRange, visitID, visitData).subscribe(
        res => {
          if (container.id == "searchResults"){
            this.resultPlaces = []
          }else{
            this.topVisits.splice(e.id, 1)
          }
        }
      );
    } 
  }
  
  private onOver(args) {
    let [e, el, container] = args;
  }
  
  private onOut(args) {
    let [e, el, container] = args;
  }

  getHeight(sec){
    return ((sec / 3600) * 40) + "px"
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

import { Component, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlannerService } from '../../services/planner.service';
import { DragulaService } from 'ng2-dragula';
import { FormsModule } from '@angular/forms';
import { durationColors } from "../../interfaces/duration-colors"


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
  //resultPlaces: Array<any>;
  resultPlaces: Array<any> = [ {
    "id": "poi:531",
    "level": "poi",
    "rating": 8.1360940209134,
    "quadkey": "120220011012100301",
    "location": {
      "lat": 48.8608385,
      "lng": 2.3363327
    },
    "bounding_box": null,
    "name": "Louvre Museum",
    "name_suffix": "Paris, France",
    "url": "https://travel.sygic.com/go/poi:531",
    "duration": 14400,
    "marker": "discovering:museum",
    "categories": [
      "discovering"
    ],
    "parent_ids": [
      "region:2015691",
      "city:14",
      "region:303",
      "country:14",
      "continent:1"
    ],
    "perex": "The largest art museum in the world is located inside the Louvre Palace which was once the residence of the French kings.",
    "customer_rating": null,
    "star_rating": null,
    "star_rating_unofficial": null,
    "thumbnail_url": "https://media-cdn.sygictraveldata.com/media/poi:531"
  },
   {
    "id": "poi:5033603",
    "level": "poi",
    "rating": 0.026790240414693,
    "quadkey": "120220011012100033",
    "location": {
      "lat": 48.8617269,
      "lng": 2.3342806
    },
    "bounding_box": null,
    "name": "Carrousel du Louvre",
    "name_suffix": "Paris, France",
    "url": "https://travel.sygic.com/go/poi:5033603",
    "duration": 5400,
    "marker": "shopping:centre:mall",
    "categories": [
      "shopping"
    ],
    "parent_ids": [
      "region:2015691",
      "city:14",
      "region:303",
      "country:14",
      "continent:1"
    ],
    "perex": "The Carrousel du Louvre is an underground shopping mall in Paris, France.",
    "customer_rating": null,
    "star_rating": null,
    "star_rating_unofficial": null,
    "thumbnail_url": "https://media-cdn.sygictraveldata.com/media/poi:5033603"
  },
   {
    "id": "poi:5036999",
    "level": "poi",
    "rating": 0.02589650549647,
    "quadkey": "120220011012100300",
    "location": {
      "lat": 48.8610214,
      "lng": 2.3358494
    },
    "bounding_box": null,
    "name": "Louvre Palace",
    "name_suffix": "Paris, France",
    "url": "https://travel.sygic.com/go/poi:5036999",
    "duration": 7200,
    "marker": "sightseeing:castle",
    "categories": [
      "hiking",
      "sightseeing"
    ],
    "parent_ids": [
      "region:2015691",
      "city:14",
      "region:303",
      "country:14",
      "continent:1"
    ],
    "perex": "The Louvre Palace is a former royal palace located on the Right Bank of the Seine in Paris, between the Tuileries Gardens and the church of…",
    "customer_rating": null,
    "star_rating": null,
    "star_rating_unofficial": null,
    "thumbnail_url": "https://media-cdn.sygictraveldata.com/media/poi:5036999"
  }
  ];
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
  }
  
  private onDrop(args) {
    let [e, el] = args;
    let visitID = e.id;
    if (!visitID){ visitID = e.childNodes[1].id};
    if(this.resultPlaces[e.id]){
      console.log(this.resultPlaces[e.id])
    }
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

import { Component, OnInit } from "@angular/core";
import { TripsService } from "../../services/trips.service";
import { SessionService } from "../../services/session.service";

@Component({
  selector: "app-trips-list",
  templateUrl: "./trips-list.component.html",
  styleUrls: ["./trips-list.component.scss"]
})
export class TripsListComponent implements OnInit {
  trips: any = [];
  
  constructor(
    public tripsService: TripsService,
    public session: SessionService
  ) {
    this.tripsService.getTrips().subscribe(res => {
      this.trips = res;
    });
  }

  ngOnInit() {}
}

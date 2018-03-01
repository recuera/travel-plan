import { Routes } from "@angular/router"
import { IntroComponent } from "./intro/intro.component";
import { LoginSignupComponent } from "./login-signup/login-signup.component";
import { TripsListComponent } from "./trips-list/trips-list.component";
import { TripsNewComponent } from "./trips-new/trips-new.component";
import { TripsPlannerComponent } from "./trips-planner/trips-planner.component";

export const routes: Routes = [
  {path: "" , component: IntroComponent },
  {path: "auth/:case" , component: LoginSignupComponent },
  {path: "trips" , component: TripsListComponent },
  {path: "trips/new" , component: TripsNewComponent },
  {path: "trips/:id" , component: TripsPlannerComponent },
  { path: "**", redirectTo: ""}
]
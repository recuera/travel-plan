import { Routes } from "@angular/router"
import { IntroComponent } from "./intro/intro.component";
import { LoginSignupComponent } from "./login-signup/login-signup.component";
import { TripsListComponent } from "./trips-list/trips-list.component";

export const routes: Routes = [
  {path: "" , component: IntroComponent },
  {path: "auth/:case" , component: LoginSignupComponent },
  {path: "trips" , component: TripsListComponent },
  { path: "**", redirectTo: ""}
]
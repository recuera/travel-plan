import { Routes } from "@angular/router"
import { IntroComponent } from "./intro/intro.component";
import { LoginSignupComponent } from "./login-signup/login-signup.component";
import { TripsListComponent } from "./trips-list/trips-list.component";

export const routes: Routes = [
  {path: "" , component: IntroComponent },
  {path: "login" , component: LoginSignupComponent },
  {path: "signup" , component: LoginSignupComponent },
  {path: "trips" , component: TripsListComponent },
  { path: "**", redirectTo: ""}
]
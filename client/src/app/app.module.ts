import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { TopbarComponent } from "./topbar/topbar.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginSignupComponent } from "./login-signup/login-signup.component";
import { HttpModule } from "@angular/http";
import { SessionService } from "../services/session.service";
import { IntroComponent } from "./intro/intro.component";
import { TripsListComponent } from "./trips-list/trips-list.component";
import { RouterModule } from "@angular/router";
import { routes } from "./routes";
import { TripsService } from "../services/trips.service";
import { TripsNewComponent } from './trips-new/trips-new.component';
import { TripsPlannerComponent } from './trips-planner/trips-planner.component';
import { PlannerService } from "../services/planner.service";
import { VisitListComponent } from './visit-list/visit-list.component';
import { VisitDayComponent } from './visit-day/visit-day.component';
import {DragulaModule, DragulaService} from 'ng2-dragula/ng2-dragula';


@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    FooterComponent,
    LoginSignupComponent,
    IntroComponent,
    TripsListComponent,
    TripsNewComponent,
    TripsPlannerComponent,
    VisitListComponent,
    VisitDayComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes),
    DragulaModule
  ],
  providers: [
    SessionService, 
    TripsService,
    PlannerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

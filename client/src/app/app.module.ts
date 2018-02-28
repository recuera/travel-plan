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

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    FooterComponent,
    LoginSignupComponent,
    IntroComponent,
    TripsListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [SessionService, TripsService],
  bootstrap: [AppComponent]
})
export class AppModule {}

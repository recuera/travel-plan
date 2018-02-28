import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent implements OnInit {

  username:string;
  password:string;
  error:string;
  constructor(public session:SessionService, public router:Router) { }

  ngOnInit() {
  }

  login(){
    this.session.login(this.username,this.password)
    .catch(e => this.error = e)
    .subscribe(user => {
      console.log(`Welcome ${user.username}`);
      this.router.navigate(['trips'])
      }
    );
  }

  signup(){
    this.session.signup(this.username,this.password)
    .catch(e => this.error = e)
    .subscribe(user => {
      console.log(`Welcome ${user.username}`);
      this.router.navigate(['trips'])
      });
  }


}

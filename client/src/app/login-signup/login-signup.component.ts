import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import {  ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent implements OnInit {

  username:string;
  password:string;
  name:string;
  error:string;
  isLogin:boolean = true;
  user:any;
  constructor(
    public session:SessionService, 
    public router:Router, 
    private route: ActivatedRoute
  ) {
    this.error = null;
    this.session.getUserEvent().subscribe(user => {
      this.user = user
      if(this.user._id){
        this.router.navigate(['trips'])
      }
    })
  }

  ngOnInit() {

    this.route
      .params
      .subscribe(params => {
        if(params['case'] == "signup"){
          this.isLogin = false ;
        }
        else{
          this.isLogin = true ;
        }
      });
  }

  login(){
    this.session.login(this.username,this.password)
    .catch(e => this.error = e)
    .subscribe(user => {
      console.log(`Welcome ${user.username}`);
      if(this.session.getUser()){
        this.router.navigate(['trips'])
      }
      }
    );
  }

  signup(){
    if(!this.username || !this.password || !this.name){
      this.error = "Please, fill all the inputs!"
      return;
    }
    console.log(this.username,this.password, this.name)
    this.session.signup(this.username,this.password, this.name)
    .catch(e => this.error = e)
    .subscribe(user => {
      console.log(`Welcome ${user.username}`);
      if(this.session.getUser()){
        this.router.navigate(['trips'])
      }
      else{
        this.router.navigate(['auth/signup'])
      }
      });
  }


}

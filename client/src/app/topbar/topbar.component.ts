import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(
    public session: SessionService, 
    public router:Router
  ) { }
  error;
  ngOnInit() {
  }

  logout(){
    this.session.logout()
    .catch(e => this.error = e)
    .subscribe(() => this.router.navigate(['']));
  }

}

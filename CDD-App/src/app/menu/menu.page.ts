import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileModel } from '../Models/ProfileModel';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  private childProfiledata:ProfileModel;

  constructor(private route: ActivatedRoute, private router: Router) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.childProfiledata = this.router.getCurrentNavigation().extras.state.data;
      }
    });
  }

  ngOnInit() {
    console.log("menu page");
    
    console.log(this.childProfiledata);
    
  }

}

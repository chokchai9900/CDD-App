import { Component } from '@angular/core';
import { DBContextService } from "../services/dbcontext.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public RateDatal$ = Promise.resolve<any>([]);

  constructor(private service: DBContextService) {}

  ngOnInit(){
    this.RateDatal$ = this.service.getData();
    console.log(this.RateDatal$);
  }
}

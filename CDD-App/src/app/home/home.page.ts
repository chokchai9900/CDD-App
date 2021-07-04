import { Component } from '@angular/core';
import { DBContextService } from "../services/dbcontext.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private service: DBContextService) {}

  ngOnInit(){
  }
}

import { Injectable } from '@angular/core';
import { DataModel } from './Models/RateDataModel';
import { DBContextService } from './services/dbcontext.service';

@Injectable({
  providedIn: 'root'
})
export class RateDataService {

  constructor(private service: DBContextService) { }

  getData(age : string,type : string){
    this.service.getRateDataByAgeValidate(age,type).then((it : DataModel) =>{
      return it.ResultAfterRate
    });
  }
}

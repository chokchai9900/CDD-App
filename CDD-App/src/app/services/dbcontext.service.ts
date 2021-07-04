import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DataModel } from "../Models/RateDataModel";

@Injectable({
  providedIn: 'root'
})
export class DBContextService {

  httpOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private url : string = 'https://cdd-service.herokuapp.com/api/';
  constructor(private httpClient: HttpClient) { }

  getRateData(): Promise<any>{
    let apiUrl = this.url + "rateData/";
    return this.httpClient.get(apiUrl).toPromise();
  }
  getRateDataByID(_id: string): Promise<any>{
    let apiUrl = this.url + "rateData/getByID/" + _id;
    return this.httpClient.get(apiUrl).toPromise();
  }
  getRateDataByAgeValidate(_id: string): Promise<any>{
    let apiUrl = this.url + "rateData/getByAgeValidate/" + _id;
    return this.httpClient.get(apiUrl).toPromise();
  }
}

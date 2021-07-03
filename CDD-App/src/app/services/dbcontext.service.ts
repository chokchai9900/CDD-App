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

  getData(): Promise<any>{
    return this.httpClient.get(this.url).toPromise();
  }
  getDataByID(_id: string): Promise<any>{
    let apiUrl = this.url + "getByID/" + _id;
    return this.httpClient.get(apiUrl).toPromise();
  }
  getByAgeValidate(_id: string): Promise<any>{
    let apiUrl = this.url + "getByAgeValidate/" + _id;
    return this.httpClient.get(apiUrl).toPromise();
  }
}

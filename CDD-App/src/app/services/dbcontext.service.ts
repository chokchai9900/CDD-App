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
  private url : string = 'https://cdd-api-net.herokuapp.com/api/';
  // private url : string = 'https://localhost:44305/api/';
  constructor(private httpClient: HttpClient) { }

  //rate data API
  getRateData(): Promise<any>{
    let apiUrl = this.url + "RateData/";
    return this.httpClient.get(apiUrl).toPromise();
  }
  getRateDataByID(_id: string): Promise<any>{
    let apiUrl = this.url + "RateData/GetByID/" + _id;
    return this.httpClient.get(apiUrl).toPromise();
  }
  getRateDataByAgeValidate(RateValidate: string,type: string): Promise<any>{
    let apiUrl = this.url + "RateData/GetDataByAgeAndType/" + RateValidate + type;
    return this.httpClient.get(apiUrl).toPromise();
  }
  //profile API
  getProfileChild() :Promise<any>{
    let apiUrl = this.url + "ProfileChild";
    return this.httpClient.get(apiUrl).toPromise();
  }
  getProfileChildById(_id: string): Promise<any>{
    let apiUrl = this.url + "ProfileChild/GetById" + _id;
    return this.httpClient.get(apiUrl).toPromise();
  }
  createProfileChild(data:any){
    let apiUrl = this.url + "ProfileChild/Create";
    console.log(JSON.stringify(data));
    return this.httpClient.post(apiUrl,data).toPromise();
  }
  UpdateProfileChild(data:any){
    let apiUrl = this.url + "ProfileChild/Update?";
    return this.httpClient.put(apiUrl,data).toPromise();
  }
  deleteProfileChild(id:string){
    let apiUrl = this.url + "ProfileChild/Delete?" + id;
    return this.httpClient.delete(apiUrl).toPromise();
  }
  //rate result AIP
  getResultByID(id:string){
    let apiUrl = this.url + "RateResult/GetByID" + id;
    return this.httpClient.get(apiUrl).toPromise();
  }
  getResultChildByID(id:string){
    let apiUrl = this.url + "RateResult/GetByChildID" + id;
    return this.httpClient.get(apiUrl).toPromise();
  }
  RateChild(childId: string,age: string,rateType: string,rate :boolean){
    let apiUrl = this.url + "RateResult/GetByChildID" + childId + age + rateType + rate;
    return this.httpClient.put(apiUrl,null).toPromise();
  }
}

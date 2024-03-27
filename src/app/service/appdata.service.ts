import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppdataService {
  private User = null;

  // private apiurl = "https://apiprojac.onrender.com";
  // private apiurl = "http://localhost:3000";
      private apiurl = "https://vercel-api-gray.vercel.app";


 
  private headerDataSubject = new BehaviorSubject<string>('https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png');
  constructor() {}



  setUser(newUser: any): void {this.User = newUser;}
  getUser(): any {return this.User;}

  getapiurl(): any {return this.apiurl;}
  
  getHeaderData(): Observable<string> {return this.headerDataSubject.asObservable();}
  updateHeaderData(newData: string): void {this.headerDataSubject.next(newData);}

  
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppdataService {
  private User = null;
//   private User = {        
//             "user_id": 13,
//             "username": "Snack",
//             "email": "Snack4234@gmail.com",
//             "password": "Snack4234",
//             "avatar": "https://firebasestorage.googleapis.com/v0/b/api-test-94f3b.appspot.com/o/images%2Fdda.jpg?alt=media&token=3dbdd160-bda9-4491-8a2f-49d952563db9",
//             "avatar_name": "dda.jpg",
//             "type": "Users"
// };
  // private apiurl = "https://apiprojac.onrender.com";
  // private apiurl = "http://localhost:3000";
      private apiurl = "https://vercel-api-gray.vercel.app";


  // private headerDataSubject = new BehaviorSubject<string>('https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png');
  private headerDataSubject = new BehaviorSubject<string>('https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png');
  constructor() { 
    // this.updateHeaderData(this.User.avatar);
  }



  setUser(newUser: any): void {this.User = newUser;}
  getUser(): any {return this.User;}

  getapiurl(): any {return this.apiurl;}
  
  getHeaderData(): Observable<string> {return this.headerDataSubject.asObservable();}
  updateHeaderData(newData: string): void {this.headerDataSubject.next(newData);}

  
}

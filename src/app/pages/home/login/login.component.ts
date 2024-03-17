import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
import { HeadComponent } from '../../head/head.component';
import { AppdataService } from '../../../service/appdata.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    HttpClientModule,
    CommonModule,
    MatFormFieldModule,
    MatFormField,
    MatInputModule,
    HeadComponent,

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  apiurl = "";
  Login : any;
  Loginfales = 1;
  constructor(private http : HttpClient,private router : Router , private appdata : AppdataService){
    this.apiurl = appdata.getapiurl();
  }



  async login(email : HTMLInputElement,pass : HTMLInputElement){

    this.Login =[];
    this.Loginfales = 1;
    // console.log(email.value,pass.value);

    const url =  `${this.apiurl}/user/`+email.value;


    this.http.get(url).subscribe((data : any) => {
      this.Login = data;     
      for(let Ln of this.Login){
        // console.log(1);
        if(email.value == Ln.email && pass.value == Ln.password){
          console.log("login ss");
          
          
          this.appdata.setUser(data[0]);
          // console.log(this.appdata.getUser());
          this.appdata.updateHeaderData(data[0].avatar);
          // console.log("=============================");
          
          
          if(Ln.type == "Users"){this.router.navigateByUrl(""); }
          else{this.router.navigateByUrl("/admin");}  

        }else{
          this.Loginfales = 2;
        }
      }
    });


  }


  reg(){
    this.router.navigateByUrl("/reg");
  }


}

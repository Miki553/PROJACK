import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AppdataService } from '../../../service/appdata.service';



@Component({
  selector: 'app-reg',
  standalone: true,
  imports: [
    MatButtonModule,
    HttpClientModule,
    CommonModule,
    MatFormFieldModule,
    MatFormField,
    MatInputModule,


  ],
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.scss'
})
export class RegComponent {
  singfales = 1;
  file? : File;
  apiurl = "";

  constructor(private http : HttpClient,private router : Router,private appdata : AppdataService){
    this.apiurl = appdata.getapiurl();
  }

  
  OnFileSelectted(event : Event){
    if((event?.target as HTMLInputElement).files){
      this.file = (event?.target as HTMLInputElement).files![0];
      console.log(this.file);
    }
  }


  async reg(username : HTMLInputElement,email : HTMLInputElement,pass : HTMLInputElement,conpass : HTMLInputElement){
    if(pass.value == conpass.value && pass.value != ""){
      let urlimg : string="";
      let nameimg : string="";
      if(this.file){
        console.log("มีไฟล์");

        const url = `${this.apiurl}/upload`;
        const formdata = new FormData();
        formdata.append('file',this.file);
        const response : any = await lastValueFrom(this.http.post(url,formdata));


        urlimg = response.url;
        nameimg = response.filename;

        console.log(response.filename);
        console.log(response.url);
      }


      const body = {
        "username": username.value,
        "email": email.value,
        "password": pass.value,
        "avatar": urlimg,
        "avatar_name": nameimg,

      }

      this.http.post<any>(`${this.apiurl}/user`, body).subscribe(
        response => {
          console.log(response);
          this.router.navigateByUrl("/login");
        },
        error => {
          console.error('Error:', error);
        }
      );
    }else{ this.singfales = 2 ;} 
  }


  back(){
    this.router.navigateByUrl("/login");
  }




}

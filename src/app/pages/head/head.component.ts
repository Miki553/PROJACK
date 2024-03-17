import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppdataService } from '../../service/appdata.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './head.component.html',
  styleUrl: './head.component.scss'
})
export class HeadComponent implements OnInit{
  User = [];
  user = 0;
  Poto: string = "";
  private subscription: Subscription | null = null;


  constructor(private router : Router,private appdata : AppdataService){}

  ngOnInit(): void {
    this.appdata.getHeaderData().subscribe((data) => {this.Poto = data;});
    const userData = this.appdata.getUser();
    if(userData !== null){
      this.Poto = userData.avatar;
      this.user = 1;
    }
  }



  gouser(){
    if(this.appdata.getUser() !== null){
      this.router.navigateByUrl("/user");
    }
  }
  gohome(){
    this.router.navigateByUrl("");
  }

  gorank(){
    // if(this.appdata.getUser() !== null){this.router.navigateByUrl("/rank");}
    this.router.navigateByUrl("/rank");
  }

  login(){
    this.router.navigateByUrl("/login");
  }

  logout(){
    let logout:any = "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png";
    this.appdata.updateHeaderData(logout);
    this.appdata.setUser(null);
    this.router.navigateByUrl("");
    this.user = 0;
  }


}

import { Component, OnInit } from '@angular/core';
import { HeadComponent } from '../head/head.component';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppdataService } from '../../service/appdata.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeadComponent,
    LoginComponent,
    RouterModule,
    HttpClientModule,
    CommonModule,
    MatSnackBarModule,
  ],
  providers: [DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  apiurl = "";
  User =[];
  img1="";
  img2="";
  image1:any;
  image2:any;
  voted: boolean = false;
  remainingTime: number = 0;


  player1Rating: number = 0 ;
  player2Rating: number = 0;
  player1Result: number = 0;
  player2Result: number = 0;


  constructor(
    private router : Router,private appdata : AppdataService,private http : HttpClient,
    private snackBar: MatSnackBar,private datePipe: DatePipe
    ){
    this.apiurl = appdata.getapiurl();
   
    this.User = appdata.getUser();
    this.random();
    if(this.remainingTime > 0){
      this.remainingTime = 0 ;
    }
    

    
    
  }




  
  

  
  

  
  

vote(img : number) {
  if (confirm('คุณแน่ใจหรือไม่ว่าต้องการโหวตรูปภาพนี้?')) {
    if (!this.voted) {
      const kFactor = 32;
      const Ra = this.image1.score;
      const Rb = this.image2.score;
      const Ea = 1 / (1 + Math.pow(10, (Rb - Ra) / 400));
      const Eb = 1 / (1 + Math.pow(10, (Ra - Rb) / 400));
      let Score1 : any;
      let Score2 : any;


      
      if(img == 1){
        Score1 = Ra + kFactor*(1-Ea);
        Score2 = Rb + kFactor*(0-Eb);
        if(this.image2.score-Score2 < 0 ){Score2 = 0;}
        // this.http.post(`${this.apiurl}/vote`,{"id": this.image1.image_id}).subscribe((data : any) => {});

        this.winimg(this.image1.image_id,Score1);
        this.lossimg(this.image2.image_id,Score2);
        
        
      }else{
        Score1 = Ra + kFactor*(0-Ea);
        Score2 = Rb + kFactor*(1-Eb);
        if(this.image1.score-Score1 < 0 ){Score1 = 0;}
        // this.http.post(`${this.apiurl}/vote`,{"id": this.image2.image_id}).subscribe((data : any) => {});

        this.winimg(this.image2.image_id,Score2);
        this.lossimg(this.image1.image_id,Score1);
        
        
      }
      console.log(this.image1.title+" : "+Score1);
      console.log(this.image2.title+" : "+Score2);
      this.updateImagesScore(Score1, Score2);



      // setTimeout(() => {
      //   this.random();
      // }, 3000);


    
    } else {console.log("โหวตไปแล้วในรอบนี้");}


  } else {console.log('ผู้ใช้ยกเลิกการโหวต');}
  
}
  






updateImagesScore(score1: number, score2: number) {
  this.http.put(`${this.apiurl}/image/`+this.image1.image_id,{"score": score1}).subscribe((data : any) => {});
  this.http.put(`${this.apiurl}/image/`+this.image2.image_id,{"score": score2}).subscribe((data : any) => {});
}

lossimg(img: number,score:number){
  this.http.get(`${this.apiurl}/statistics/`+img).subscribe((data : any) => {
    let stt = data[0];
    this.http.put(`${this.apiurl}/statistics/score`,{"score":score,"statistics_ID":stt.statistics_ID}).subscribe((data : any) => {this.random();});
  });
}

winimg(img_id: number,score:number){
this.http.get(`${this.apiurl}/statistics/`+img_id).subscribe((data : any) => {
  let stt = data[0];
  const day  = this.getday();
  const statisticsDay = stt.day; 

  if(day == statisticsDay){
    console.log("update");
    this.http.put(`${this.apiurl}/statistics`,{"score":score,"statistics_ID":stt.statistics_ID}).subscribe((data : any) => {});
  }else{
    console.log("add");
    const body2 = {
      "img_id": stt.image_id,
      "score": score,
      "rank": 900
    };
    this.http.post(`${this.apiurl}/statistics/add`, body2).subscribe((data : any) => {});
  }
});
}


getday(): number {
  const currentDate = new Date();
  const dayOfMonth = currentDate.getDate(); // นับวันที่ของเดือนปัจจุบัน
  return dayOfMonth;
}


openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
        duration: 2000, // ระยะเวลาที่แสดงข้อความ (มิลลิวินาที)
        verticalPosition: 'top', // ตำแหน่งตามแนวดิ่ง
        horizontalPosition: 'center' // ตำแหน่งตามแนวนอน
    });
}

random(){
    this.http.get(`${this.apiurl}/image/random`).subscribe((data : any) => {
      if(data.length > 1){
        this.image1 = data[0];
        this.image2 = data[1];
      }else{

        this.image1 = null;
        this.image2 =  null;
      }
    });

}
}

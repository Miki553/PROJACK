import { Component } from '@angular/core';
import { HeadComponent } from '../head/head.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import Chart from 'chart.js/auto';
import { AppdataService } from '../../service/appdata.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { merge } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-userinfo',
  standalone: true,
  imports: [
    HeadComponent,
    RouterModule,
    HttpClientModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatFormField,
    MatInputModule,
    
    
  ],
  providers: [DatePipe],
  templateUrl: './userinfo.component.html',
  styleUrl: './userinfo.component.scss'
})
export class UserinfoComponent{
  User :any;
  Image :any;
  Imageres :any;
  day:any;
  add :boolean =false;
  edit :boolean =false;
  imginfo :any;
  file? : File;
  apiurl = "";
  editid :any;
 
  constructor(private datePipe: DatePipe,private appdata : AppdataService,private http : HttpClient,private router :Router) {
    this.apiurl = appdata.getapiurl();
    this.User = appdata.getUser();
    this.poto5();

    
    // console.log(this.User);
  }

  



  poto5(){
    const url =  `${this.apiurl}/image/`+this.User.user_id;
    this.http.get(url).subscribe((data : any) => {
      this.Image = data;
      this.Imageres = new Array(5 - this.Image.length);;     
    });
  }



async editimg(title : HTMLInputElement){
  const body = {
    "title": title.value,
  }
  


  this.http.put(`${this.apiurl}/image/title/`+this.editid.image_id, body).subscribe((data : any) => {
    console.log(data);
    this.edit =false;
    this.poto5();
  });
}
  






addpoto(){
    this.add = true;
    this.edit = false;
}

cancle(){
  this.add =false;
  this.edit = false;
}

editpotoinfo(i : number){
    this.edit = true;
    this.add =false;
    this.editid = this.Image[i];
    
}





deletepotoinfo(id: number, name: string) {
  if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรูปภาพนี้?')) {
    const uploadRequest = this.http.delete(`${this.apiurl}/upload/` + name);
    const imageRequest = this.http.delete(`${this.apiurl}/image/` + id);
    const statisticsRequest = this.http.delete(`${this.apiurl}/statistics/` + id);
    merge(uploadRequest, imageRequest, statisticsRequest).subscribe({
      next: (data: any) => {
        this.poto5();
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }

}


    //add
async addimg(title: HTMLInputElement) {
  if (this.file) {
    console.log("มีไฟล์");
    
    const formdata = new FormData();
    formdata.append('file', this.file);
    const response: any = await lastValueFrom(this.http.post(`${this.apiurl}/upload`, formdata));
    const body = {
      "Uid": this.User.user_id,
      "title": title.value,
      "image": response.url,
      "img_name": response.filename,
    }
    try {
      const addResponse: any = await lastValueFrom(this.http.post(`${this.apiurl}/image`, body));
      const img_id = addResponse.last_idx;
      const body2 = {
        "img_id": img_id,
        "score": 1000,
        "rank": 999
      };
      
      await this.http.post(`${this.apiurl}/statistics`, body2).toPromise();
      this.add = false;
      this.poto5();
    } catch (error) {
      console.error('Error:', error);
    }
  }
  this.http.put(`${this.apiurl}/statistics/updaterank`,{"id":1}).subscribe((data : any) => {console.log(data);});
}
    

  OnFileSelectted(event : Event){
    if((event?.target as HTMLInputElement).files){
      this.file = (event?.target as HTMLInputElement).files![0];
      console.log(this.file);
    }
  }

  getday(num : number){
    const currentDate = new Date();
    const pastDate = new Date(currentDate.setDate(currentDate.getDate() - num));
    const formattedDate = this.datePipe.transform(pastDate, 'dd');
    return formattedDate;
  }

  getCurrentDate() {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    console.log(formattedDate); // แสดงค่าวันที่ปัจจุบันในรูปแบบ 'yyyy-MM-dd' ในคอนโซล
  }


  ngAfterViewInit(): void {

    const data = [
      { day: this.getday(7), count: 30 },
      { day: this.getday(6), count: 20 },
      { day: this.getday(5), count: 25 },
      { day: this.getday(4), count: 25 },
      { day: this.getday(3), count: 22 },
      { day: this.getday(2), count: 10 },
      { day: this.getday(1), count: 28 },
    ];

    const canvas = document.getElementById('acquisitions2') as HTMLCanvasElement;
    if (canvas) {
      const existingChart = Chart.getChart(canvas);
      if (existingChart) {
        existingChart.destroy();
      }
      const chart = new Chart(
        canvas,
        {
          type: 'line',
          options: {
            animation: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                enabled: false
              }
            }
          },
          data: {
            labels: data.map(row => row.day),
            datasets: [
              {
                label: 'Acquisitions by year',
                data: data.map(row => row.count)
              }
            ]
          }
        }
      );
    }
  }



}

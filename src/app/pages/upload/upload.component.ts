import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    MatInput,
    MatButton,
    CommonModule,
    HttpClientModule,

  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  file? : File;
  constructor(private http : HttpClient){

  }
  async Upload(){
    if(this.file){
      const url = "http://202.28.34.197/tripbooking/upload";
      const formdata = new FormData();
      formdata.append('file',this.file);
      const response : any = await lastValueFrom(this.http.post(url,formdata));
      console.log("http://202.28.34.197/tripbooking/upload/"+response.filename);
    }


  }
  OnFileSelectted(event : Event){
    if((event?.target as HTMLInputElement).files){
      this.file = (event?.target as HTMLInputElement).files![0];
      console.log(this.file);
    }
  }

}

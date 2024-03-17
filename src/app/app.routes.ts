import { Routes } from '@angular/router';
import { UploadComponent } from './pages/upload/upload.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/home/login/login.component';
import { RegComponent } from './pages/home/reg/reg.component';
import { UserinfoComponent } from './pages/userinfo/userinfo.component';
import { RankComponent } from './pages/rank/rank.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HeadComponent } from './pages/head/head.component';




export const routes: Routes = [

    {path : "user" ,component : UserinfoComponent},
    { path: "rank", component: RankComponent },
    {path : "up" ,component : UploadComponent},
    {path : "profile" ,component : ProfileComponent},
    {path : "admin" ,component : AdminComponent},
    {path : "head" ,component : HeadComponent},
    
    {path : "" ,component : HomeComponent,children: [
      { path: "login", component: LoginComponent },
      { path: "reg", component: RegComponent } ,
      
    ]},
    
];

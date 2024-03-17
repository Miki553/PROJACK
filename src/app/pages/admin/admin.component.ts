import { Component } from '@angular/core';
import { HeadComponent } from '../head/head.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    HeadComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}

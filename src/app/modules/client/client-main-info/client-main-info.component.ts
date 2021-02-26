import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Client} from 'src/app/models/client/client';


@Component({
  selector: 'app-client-main-info',
  templateUrl: './client-main-info.component.html',
  styleUrls: ['./client-main-info.component.css']
})
export class ClientMainInfoComponent implements OnInit {
  @Input() client?: Client;
  constructor(public authService: AuthService) {
    
   }

  ngOnInit(): void {
  }
  
}

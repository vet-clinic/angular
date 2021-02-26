import { Component, Input, OnInit } from '@angular/core';
import {Client} from 'src/app/models/client/client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  @Input() client?: Client
  constructor() { }

  ngOnInit(): void {
  }

}

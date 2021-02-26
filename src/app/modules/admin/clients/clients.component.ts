import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Client }  from 'src/app/models/client/client';
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients?: Client[]
  constructor(private apiService: ApiService) {
    this.initializeClients();
   }

  ngOnInit(): void {
  }


  initializeClients() 
  {
    this.apiService.getEntity('clients').subscribe(
      (response) =>
        {
          this.clients = response.data;
        }
    )      
  }

}

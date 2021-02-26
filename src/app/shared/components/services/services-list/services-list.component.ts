import { Component, OnInit } from '@angular/core';
import {Service} from '../../../../models/service/service';
import {ServiceService} from '../../../../services/service.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit {

  services: Service[] | undefined;

  constructor(public service: ServiceService) { }

  ngOnInit(): void {
    this.service.getServices().subscribe(data => {
      // @ts-ignore
      this.services = data.data;
    });
  }

}


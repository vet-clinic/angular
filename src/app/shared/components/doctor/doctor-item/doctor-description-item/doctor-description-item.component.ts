import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-description-item',
  templateUrl: './doctor-description-item.component.html',
  styleUrls: ['./doctor-description-item.component.css']
})
export class DoctorDescriptionItemComponent implements OnInit {

  @Input() name!:string;
  @Input() description!:string;

  constructor() { }

  ngOnInit(): void {
  }

}

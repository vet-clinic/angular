import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-validation-exception',
  templateUrl: './doctor-validation-exception.component.html',
  styleUrls: ['./doctor-validation-exception.component.css']
})
export class DoctorValidationExceptionComponent implements OnInit {

  @Input() exeption: any;
  @Input() name!: string;

  constructor() { }

  ngOnInit(): void {      
  }

}

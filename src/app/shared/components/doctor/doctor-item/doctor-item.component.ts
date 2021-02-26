import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor/doctor';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-item',
  templateUrl: './doctor-item.component.html',
  styleUrls: ['./doctor-item.component.css']
})
export class DoctorItemComponent implements OnInit {

  @Input() doctor!:Doctor;
  @Input() notListItem!:boolean;

  closedInformation!:boolean ;

  constructor(
    private authService: AuthService,
    private doctorService: DoctorService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(this.authService.userData)
    {
      if((this.authService.userData.name==this.doctor?.userName
        || this.authService.isInRole('admin'))
        && this.notListItem){
          this.closedInformation=true;
        }        
    }  
  }

  goToSettings(doctor:Doctor){
      this.doctorService.changeDoctor(doctor);      
      this.router.navigate(["doctor",doctor.id,"edit-doctor"]) ;
  }

}

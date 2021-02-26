import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models/doctor/doctor';
import { PageResponse } from 'src/app/models/doctor/pageResponse';
import { Response } from 'src/app/models/doctor/response';
import { Filter } from 'src/app/models/queries/filter';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-doctor',
    templateUrl: './doctor.component.html',
    styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctor!:Doctor;
  id!:number;
  isEmploee:boolean=false;

  constructor(private activatedRoute: ActivatedRoute, 
    private doctorService: ApiService,
    private authService:AuthService,
    ) { }

  ngOnInit(): void {       
    let id= this.activatedRoute.snapshot.paramMap.get('id') ;
    this.id = id ? parseInt(id) : 0;
    if(this.id==0){
        let params: Filter = { 'UserId': this.authService.userData.sub };
        this.doctorService.getEntity('doctors', params).subscribe(
            (data: PageResponse) => {
                this.doctor = data.data[0];                
            })
    }    
    else{
        this.doctorService.getEntityById('doctors',this.id).subscribe((data: Response)=>{
        this.doctor=data.data; 
        });
    }

    if(this.authService.userData){
      this.isEmploee=this.authService.isInRole('admin')
      ||this.authService.isInRole('doctor');
    }    
  }

}


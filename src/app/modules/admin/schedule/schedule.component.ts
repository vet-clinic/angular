import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/doctor/appointment';
import { Doctor } from 'src/app/models/doctor/doctor';
import { PageResponse } from 'src/app/models/doctor/pageResponse';
import { Filter } from 'src/app/models/queries/filter';
import { ApiService } from 'src/app/services/api.service';

export interface DoctorSchedule {
  id:number;
  name: string;
  appointment1: Appointment;
  appointment2: Appointment;
  appointment3: Appointment;
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  displayedColumns: string[] = ['name', 'appointment1','appointment2','appointment3'];
  dataSource !:DoctorSchedule[];  
  doctors!:Doctor[];

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.getDoctors();    
    
  }

  getDoctors(){
    this.apiService.getEntity("doctors").subscribe((data:PageResponse)=>
    {
      this.doctors=data.data;      
      this.getDoctorSckedule();             
    })
  }

  getDoctorSckedule(){
    for(let doctor of this.doctors){
      this.getAppointment(doctor);      
    }
  }

  getAppointment(doctor:Doctor){
    let appointments:Appointment[];
    if(doctor.id!=null){
    let filter: Filter;                 
           filter = { doctorId: doctor.id.toString(),
            StatusId: "1" ,
            PageSize:"3",
            OrderBy:"desc"};                
            this.apiService.getEntity('appointments', filter)
                    .subscribe((res2:PageResponse) => {   
                      appointments=res2.data;
                      let data:DoctorSchedule={id:doctor.id?doctor.id:1,
                      name: doctor.firstName+" "+doctor.lastName,
                      appointment1:appointments[0],
                      appointment2:appointments[1],
                      appointment3:appointments[2]}
                      if(this.dataSource===undefined){
                        this.dataSource=new Array<DoctorSchedule>()
                        this.dataSource.push(data);
                      }
                      else{
                        this.dataSource.push(data);
                      }  
                         this.dataSource.sort((a,b)=>a.id-b.id)     
                    }); 
                  }      
  }

}


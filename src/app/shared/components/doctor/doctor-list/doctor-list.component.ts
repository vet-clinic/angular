import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor/doctor';
import { PageResponse } from 'src/app/models/doctor/pageResponse';
import { Filter } from 'src/app/models/queries/filter';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  doctorPageResponse!: PageResponse;
  pagesArr!:Array<number>;
  resizeContent:boolean=false;
  isClient:boolean=this.authService.isInRole("client")
  ||!this.authService.isLogedIn()

  constructor(private router: Router,
    private authService: AuthService,
     private doctorService: ApiService) { }

  ngOnInit(): void {   
    let params: Filter = { 'PageSize': "5"};
    this.doctorService.getEntity('doctors', params).subscribe((data: PageResponse)=>{
    this.doctorPageResponse=data;
    this.createPageArray(data.totalPages);
  this.resizeListContent(data.objectsCount);});
  }

  onSelect(doctor:Doctor){
    if(!this.isClient)   
      this.router.navigate(["doctor",doctor.id]);
  }

  changepage(pageNumber:number){
    let params: Filter = { 'PageSize': "5",
    'PageNumber': pageNumber.toString()};
    this.doctorService.getEntity('doctors', params).subscribe((data: PageResponse)=>{
    this.doctorPageResponse=data;
    this.createPageArray(data.totalPages);
    this.resizeListContent(data.objectsCount);});
  }

  createPageArray(num:number){
    this.pagesArr = Array(num).fill(1).map((x,i)=>i+1)
  }
  
  resizeListContent(totalItems:number){
    if(totalItems<3)
    {
      this.resizeContent=true;
    }
    else{
      this.resizeContent=false;
    }
  }
}

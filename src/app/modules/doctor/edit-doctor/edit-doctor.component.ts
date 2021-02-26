import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor/doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import { FormGroup ,FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Position } from 'src/app/models/doctor/position';
import { Response } from 'src/app/models/doctor/response';
import { PageResponse } from 'src/app/models/doctor/pageResponse';
import { MatDialog } from '@angular/material/dialog';
import { ConfimDialogComponent } from 'src/app/shared/components/dialogs/assess-dialog/confim-dialog.component';
import { AlertDialogComponent } from 'src/app/shared/components/dialogs/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})
export class EditDoctorComponent implements OnInit {
  
  editDoctorForm:FormGroup=new FormGroup({
    firstName: new FormControl("",[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30)
    ]),
    lastName:new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30)
    ]),
    email:new FormControl('', [      
      Validators.minLength(4),
      Validators.maxLength(30)
    ]),
    phoneNumber:new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(12),
      this.notNumberValidator()
    ]),
    positionId:new FormControl('',),
    education:new FormControl('',[      
      Validators.maxLength(100)
    ]),
    biography:new FormControl('',[      
      Validators.maxLength(200)
    ]),
    experience:new FormControl('',[
      Validators.maxLength(100)
    ]),
    photo:new FormControl('',),
  });    
  closedInformation!:boolean ;
  doctor!:Doctor;  
  positions!:Position[];
  id!:number;

  constructor(private doctorService:DoctorService,
    private apiService:ApiService,
    private activatedRoute:ActivatedRoute,
    public authService: AuthService,   
    private router:Router, 
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.doctorService.currDoctor.subscribe(doc=>this.doctor=doc)    
    let id= this.activatedRoute.snapshot.paramMap.get('id') ;
    this.id = id ? parseInt(id) : 0; 
    this.apiService.getEntityById('doctors',this.id).subscribe((data: Response)=>{
      this.doctor=data.data; 
      this.fillProfile();  
      this.closedInformationCheck();
      });
      this.apiService.getEntity('positions').subscribe((data: PageResponse)=>{
      this.positions=data.data;
    })
  }

  notNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
    let accountRgEx: RegExp = /^[0-9]+(\.?[0-9]+)?$/
    let valid =
      !control.value || accountRgEx.test(control.value)
    return valid ? null : { notNumber: true };
  }
  }  
  
  fillProfile(){
    this.editDoctorForm.patchValue({
      firstName: this.doctor.firstName,
      lastName: this.doctor.lastName,
      email: this.doctor.email,
      phoneNumber: this.doctor.phoneNumber,
      education: this.doctor.education,
      biography: this.doctor.biography,
      experience: this.doctor.experience,
      photo: this.doctor.photo,
      positionId:this.doctor.positionId,
    }); 
  }

  closedInformationCheck(){
    if(this.authService?.userData)
    {      
      if((this.authService?.userData.name==this.doctor?.userName
        || this.authService?.isInRole('admin')))
        {
          this.closedInformation=true;
        }        
    } 
  }

  updateProfile() {
    this.doctor.firstName=this.editDoctorForm.value.firstName;
    this.doctor.lastName=this.editDoctorForm.value.lastName;
    this.doctor.email=this.editDoctorForm.value.email;
    this.doctor.phoneNumber=this.editDoctorForm.value.phoneNumber;
    this.doctor.education=this.editDoctorForm.value.education;
    this.doctor.biography=this.editDoctorForm.value.biography;
    this.doctor.experience=this.editDoctorForm.value.experience;
    this.doctor.photo=this.editDoctorForm.value.photo;
    this.doctor.positionId=this.editDoctorForm.value.positionId;   
    
    this.apiService.updateEntity('doctors',this.id,this.doctor).subscribe(
      ()=>{
        this.dialog.open(AlertDialogComponent,{
      data: "Changes is saved"
     });
     this.router.navigate(["doctor",this.id]); 
      }
    ); 
  }

  deleteDoctor(){      
    const dialogRef = this.dialog.open(ConfimDialogComponent,{
      data: "Do you really want to remove this doctor?"
     });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
       this.doctor.isDeleted=true;
      this.apiService.updateEntity('doctors',this.id,this.doctor).subscribe(
        ()=>this.router.navigate(["doctor/list"])
      ); 
      }
    });
  } 
}

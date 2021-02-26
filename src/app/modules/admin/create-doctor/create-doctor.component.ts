import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Position } from 'src/app/models/doctor/position';
import { PageResponse } from 'src/app/models/doctor/pageResponse';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertDialogComponent } from 'src/app/shared/components/dialogs/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.css']
})
export class CreateDoctorComponent implements OnInit {

doctorForm:FormGroup=new FormGroup({
    userName: new FormControl("",[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30),      
    ],[
      this.userNameValidator()
    ]),
    password: new FormControl("",[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
      this.passwordValidator(),
    ]),
    repeatedPassword: new FormControl("",[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30),      
      this.repeatPasswordValidator(),
      this.passwordValidator(),
    ]),
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
    positionId:new FormControl('',
    [
      Validators.required
    ]),
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
 
  positions!:Position[];
  hide:boolean = true; 

  constructor(private apiService:ApiService,
    public authService: AuthService,   
    private router:Router,
    public dialog: MatDialog 
    ) { }

  ngOnInit(): void {  
      this.apiService.getEntity('positions').subscribe((data: PageResponse)=>{
    this.positions=data.data;    
    });
    
  }  

  notNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
    let accountRgEx: RegExp = /^[0-9]+(\.?[0-9]+)?$/
    let valid =
      !control.value || accountRgEx.test(control.value)
    return valid ? null : { notNumber: true };
    }
  } 

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
    let numberRgEx: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;    
    let valid =
      !control.value || (numberRgEx.test(control.value))      
    return valid ? null : { invalidPassword: true };
    }
  } 

  repeatPasswordValidator():ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let valid =
      !control.value || (control.value==this.doctorForm.get(['password'])?.value)     
    return valid ? null : { wrongPassword: true };
    }  
  }


  userNameValidator(): AsyncValidatorFn {    
     return async (control: AbstractControl): Promise<ValidationErrors | null| Observable<ValidationErrors>| null> => { 
       let userNameExist!:boolean
      await this.userNameExistPromise(control).then( 
        data=>{ userNameExist= data;                   
        })    
        let  valid =!control.value || !userNameExist;        
        return valid ? null : { userNameExist: true };                
    }
  } 
  
  createProfile() { 
    let doctor={
      "biography":this.doctorForm.value.biography,
      "education":this.doctorForm.value.education,
      "experience":this.doctorForm.value.experience,
      "photo":this.doctorForm.value.photo,
      "positionId":this.doctorForm.value.positionId,      
      "userName":this.doctorForm.value.userName,
      "firstName":this.doctorForm.value.firstName,
      "lastName":this.doctorForm.value.lastName,
      "phoneNumber":this.doctorForm.value.phoneNumber,
      "email":this.doctorForm.value.email,
      "password":this.doctorForm.value.password,
       
    }  
    this.apiService.addEntity('doctors',doctor).subscribe(()=>{
       this.dialog.open(AlertDialogComponent,{
      data: "Changes is saved"
     });
    this.router.navigate(["doctor/list"]) ;
    },
    error => console.error('oops', error.error));
       
  }

  cancel(){    
    this.router.navigate(["admin"]) ;
  }
  
userNameExistPromise(control: AbstractControl){      
      let p = new Promise<boolean>((resolve,reject)=>{
      if(control.value){  
        this.apiService.getEntityById('account', control.value).subscribe(
          (data: boolean) => {                   
          resolve(data); 
        })         
      } 
    }) 
    return p
  }
}
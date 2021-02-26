import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { PasswordValidators } from './password.validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
    
  form = new FormGroup({
    oldPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(128),
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
      this.noWhitespaceValidator,
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(128),
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
      this.noWhitespaceValidator,
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(128),
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
      this.noWhitespaceValidator,
    ]),
  }, { validators: PasswordValidators.passwordsShouldMatch });

  constructor(private serv: ApiService, public authService: AuthService, private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
  }

  get oldPassword() {
    return this.form.get('oldPassword');
  }
  get newPassword() {
    return this.form.get('newPassword');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  private save(){
    if (!this.form.invalid) {
      
        this.serv.updateEntity('account/changepass',
         this.authService.userData.sub,
         {id:this.authService.userData.sub, oldPassword:this.oldPassword!.value, newPassword:this.newPassword!.value})
        .subscribe(()=>{
          alert(`Pass Changed`);
          this.router.navigate(['/']); 
        });
      }
  }

  public cancel(){
    this.form.reset('');
  }

  public onSubmit(){
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    

    this.http.post(`${environment.BASEURL}/account/validate/pass`,
     {id:this.authService.userData.sub, oldPassword:this.oldPassword!.value},
     { headers: myHeaders })
    .subscribe((data)=>{
      let oldPassExists= data as boolean;
      this.setPassError(oldPassExists);
    });    
  }

  public setPassError(oldPassExists:boolean){
    if(!oldPassExists){
     this.oldPassword?.setErrors({'invalidOldPassword':true});
    }else{
      this.oldPassword?.setErrors(null);
      if(!this.form.invalid){
        this.save();
      }
    }
     
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormControl, FormGroup, Validators , ValidatorFn, AbstractControl} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service' 
import { EmailService} from 'src/app/services/email.service' 
@Component({
  selector: 'app-client-register-form',
  templateUrl: './client-register-form.component.html',
  styleUrls: ['./client-register-form.component.css']
})
export class ClientRegisterFormComponent implements OnInit {
  clientForm: FormGroup = new FormGroup({
  userName: new FormControl('', 
  [
    Validators.required, Validators.maxLength(30)
  ]
  ),
  firstName: new FormControl('',
  [
    Validators.required, Validators.maxLength(30)
  ]
  ),
  lastName: new FormControl('',[
    Validators.required, Validators.maxLength(30)
  ]),
  email: new FormControl('',[
    Validators.required, Validators.maxLength(50), Validators.email
  ]),
  phoneNumber: new FormControl('',[
    Validators.required, Validators.pattern("^[0-9]{12}$")
  ]),
  password: new FormControl('',[
    Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
  ]),
  repeatedPassword: new FormControl('',[
    Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
    this.repeatPasswordValidator()
  ]),
  })
  constructor(public apiService: ApiService, public http: HttpClient, public authService: AuthService,
    public clientService: ClientService, private emailService: EmailService) {   
   }

  ngOnInit(): void {  
}

  isControlInvalid(controlName: string): boolean {
    const control = this.clientForm.controls[controlName];
    
    const result = control.invalid && control.touched;
    
    return result;
}

 onSubmit() {
  const controls = this.clientForm.controls;
  
    if (this.clientForm.invalid) {
    Object.keys(controls)
     .forEach(controlName => controls[controlName].markAsTouched());
          return;
    }
   
    else {
      console.log("input successful");
      this.register();
    }
   
  }

  register()
  {
    let client ={
      "userName": this.clientForm.value.userName,
      "firstName": this.clientForm.value.firstName,
      "lastName": this.clientForm.value.lastName,
      "email": this.clientForm.value.email,
      "phoneNumber": this.clientForm.value.phoneNumber,
      "password": this.clientForm.value.password,
    }
    this.apiService.addEntity('clients', client).subscribe(response =>
      {
        console.log(client);
        this.emailService.sendRegistrationNotification(client.userName);
        alert('Registration is successful');
        this.clientService.mainAppPage();
      },
      error => {
        console.log(client);
        console.log(error);
    }
      );
    
  }

  cancel()
  {
    console.log("cancelled");
    this.clientService.mainAppPage();
  }

  repeatPasswordValidator():ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let valid =
       (control.value==this.clientForm?.get(['password'])?.value)     
      return valid ? null : { wrongPassword: true };
    }  
  }

}

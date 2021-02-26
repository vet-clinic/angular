import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Filter } from '../models/queries/filter';
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) 
  { }
   
  emailController: string =  "EmailNotifications";
  sendNotification(eventType: string, id: string|number)
  {
       return this.http.get(`${environment.BASEURL}/${this.emailController}/${eventType}/${id}`);   
  }

  sendRegistrationNotification(username: string)
  {
     this.sendNotification("registration", username).subscribe();
  }

  sendAppointmentNotification(appointmentId: number)
  {
     this.sendNotification("appointments", appointmentId).subscribe();
  }
}

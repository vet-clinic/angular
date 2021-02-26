import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { Doctor } from '../models/doctor/doctor';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  doctor!:Doctor;

  constructor() { } 

  private doctorSource = new BehaviorSubject<Doctor>(this.doctor);
  currDoctor = this.doctorSource.asObservable();

  changeDoctor(doctor:Doctor){
    this.doctorSource.next(doctor);
  }

}

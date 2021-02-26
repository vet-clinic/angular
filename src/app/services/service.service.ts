import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Service} from '../models/service/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(public apiService: ApiService) { }

  formData: Service = new Service();

  addService(): Observable<Service>  {
     return this.apiService.addEntity('services', this.formData);
  }

  updateService(): Observable<Service> {
     return this.apiService.updateEntity('services', this.formData.id as number, this.formData);
  }

  getServices(): Observable<Service[]> {
    return this.apiService.getEntity('services');
  }

  deleteService(id: number): Observable<Service>{
    return this.apiService.deleteEntity('services', id);
  }

  sendMessage(serviceId: number): Observable<Service>{
    return this.apiService.sendMessageGet('services', serviceId);
  }

}

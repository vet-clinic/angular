import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Filter } from '../models/queries/filter';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  getEntity(entity: string, filter?: Filter): Observable<any> {
    let filterString = `?`;
    for (const property in filter) {
      if (filter.hasOwnProperty(property)) {
        filterString += `${property.charAt(0).toUpperCase() + property.slice(1)}=${filter[property]}&`;
      }
    }
    return this.http.get(`${environment.BASEURL}/${entity}${filter ? filterString : ''}`);
  }

  getEntityById(entity: string, id: number|string): Observable<any> {
    return this.http.get(`${environment.BASEURL}/${entity}/${id}`);
  }

  addEntity(entity: string, payload: any): Observable<any> {
    return this.http.post(`${environment.BASEURL}/${entity}`, payload);
  }

  updateEntity(entity: string, id: number|string, payload: any): Observable<any> {
    return this.http.put(`${environment.BASEURL}/${entity}/${id}`, payload);
  }

  deleteEntity(entity: string, id: number|string): Observable<any> {
    return this.http.delete(`${environment.BASEURL}/${entity}/${id}`);
  }

  sendMessageGet(routeAction: string, id?: number|string): Observable<any>{
    return this.http.get(`${environment.BASEURL}/emailNotifications/${routeAction}/${id}`);
  }

  sendMessagePost(routeAction: string, messageBody: any): Observable<any>{
    return this.http.post(`${environment.BASEURL}/emailNotifications/${routeAction}`, messageBody);
  }

  downloadFile(route: string, payload: any): Observable<Blob>{
    return this.http.post(`${environment.BASEURL}/${route}`, payload,
      { reportProgress: true, responseType: 'blob' });
  }
}

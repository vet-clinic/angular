import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(public router: Router) { }

  mainAppPage()
  {
    this.router.navigate(['..']);
  }

  clientCabinetEnter()
  {
    this.router.navigate(['/client']);
  }
}

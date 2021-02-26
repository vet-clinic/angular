import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  imagePath = 'assets/img/logo.svg';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private router: Router) {}

  ngOnInit() {
  }

  goToRoles($myParam: string = ''): void {
    const navigationDetails: string[] = ['/role'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }

  moveToCabinet(){
    if (this.authService.isInRole("doctor"))
    {
      this.router.navigate(["doctor"])
    }else if (this.authService.isInRole("client")){
      this.router.navigate(["client"]);
    }else if (this.authService.isInRole("admin")){
      this.router.navigate(["admin"]);
    }else if (this.authService.isInRole('accountant')){
      this.router.navigate(['accountant']);
    }
  }

}

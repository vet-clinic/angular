import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/role/role';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(32),
      this.noWhitespaceValidator
    ]),
  });

  get name() {
    return this.form.get('name');
  }

  editedRole!: Role;

  constructor(private serv: ApiService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loadRole();
  }

  private getRole(id: string) {
    this.serv.getEntityById('role', id)
      .subscribe(
        (role: any) => {
          this.editRole(role.data);
        },
        (err: any) => console.log(err)
      );
  }

  private loadRole() {
    this.route.paramMap.subscribe(params => {
      const empId = params.get('id');
      if (empId) {
        this.getRole(empId);
      }
    });
  }

  editRole(role: Role) {
    this.editedRole = new Role(role.id, role.name);
    this.form.get('name')?.setValue(role.name);
  }

  saveRole() {
    if (!this.form.invalid) {
      if (!this.editedRole) {
        this.serv.addEntity('role',new Role('', this.name?.value)).subscribe(()=>{
          alert(`Role created`);
          
          this.router.navigate(['/admin/role']); 
        });
       
      } else {
        this.serv.updateEntity('role', this.editedRole.id, new Role(this.editedRole.id, this.name?.value)).subscribe(()=>{
          alert(`Role updated`);
          
          this.router.navigate(['/admin/role']);
        });
      }
    }
  }
  
  cancel() {
    this.router.navigate(['/admin/role']);
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}

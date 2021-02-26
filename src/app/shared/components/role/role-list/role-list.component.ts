import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role/role';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  editedRole!: Role;
  roles: Array<Role>;
  isNewRecord!: boolean;

  constructor(private serv: ApiService,
    private router: Router) {

    this.roles = new Array<Role>();
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  public loadRoles(): Array<Role> {
    this.serv.getEntity('Role').subscribe((data: any) => {
      this.roles = data.data;
    });
    return this.roles;
  }


  addRole() {
    this.router.navigate(['/admin/role/create']);
  }

  editRole(role: Role) {
    this.editedRole = new Role(role.id, role.name);
    
    this.router.navigate(['/admin/role/edit',role.id]);
  }

  deleteRole(role: Role) {
    this.serv.deleteEntity('role', role.id).subscribe(data => {
        this.loadRoles();
    });
  }
}

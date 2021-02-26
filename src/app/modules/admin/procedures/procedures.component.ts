import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service'
import { Procedure } from 'src/app/models/procedures/procedure'
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';


@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.css']
})
export class ProceduresComponent implements OnInit {

  procedures : Procedure[] | null;

  constructor(private apiService: ApiService,
    private router: Router,
    private dialogService: DialogService) {
    this.procedures = null;
    this.initializeProcedures();
   }
  ngOnInit(): void {
  }
   
  initializeProcedures()
  {
     this.apiService.getEntity('procedures').subscribe(
       (response) => {
         this.procedures = response.data;
       }
     )

  }

  onDelete(procedure: Procedure)
  {
    this.dialogService.openConfirmDialog('Are you sure that you want to delete this procedure?')
      .afterClosed().subscribe(res => {
        if (res){
              this.deleteProcedure(procedure);
              }         
        }
    );
  }

  deleteProcedure(procedure: Procedure)
  {
    let id = procedure.id;
    this.apiService.deleteEntity('procedures', id).subscribe(
      () =>{
        this.initializeProcedures();
      }
    );
  }

  updateProcedure(procedure: Procedure)
  {
      this.router.navigate(['/admin/procedures/update'], {state: {data: procedure}});
  }
}

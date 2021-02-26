import {Component, OnInit, ViewChild} from '@angular/core';
import {Service} from '../../../models/service/service';
import {ServiceService} from '../../../services/service.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ServiceComponent} from './service/service.component';
import {NotificationService} from '../../../services/notification.service';
import {DialogService} from '../../../services/dialog.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  openStatus = false;
  // @ts-ignore
  dataSource: MatTableDataSource<Service>;

  constructor(public service: ServiceService, public dialog: MatDialog,
              public notificationService: NotificationService,
              public dialogService: DialogService) { }


  displayedColumns: string[] = ['serviceName', 'description', 'actions'];
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  searchKey: string | undefined;

  ngOnInit(): void {
      this.service.getServices().subscribe(data => {
        // @ts-ignore
        this.dataSource = new MatTableDataSource<Service>(data.data);
        // @ts-ignore
        this.dataSource.sort = this.sort;
        // @ts-ignore
        this.dataSource.paginator = this.paginator;
      });
  }

  updateDataSource(): void{
    this.service.getServices().subscribe(response => {
      // @ts-ignore
      this.dataSource = new MatTableDataSource<Service>(response.data);
      // @ts-ignore
      this.dataSource.sort = this.sort;
      // @ts-ignore
      this.dataSource.paginator = this.paginator;
    });
  }

  onSearchClear(): void {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter(): void {
    // @ts-ignore
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  openDialogWindow(): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ServiceComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {
      this.updateDataSource();
    });
  }

  onCreate(): void {
    this.openDialogWindow();
  }

  onEdit(element: any): void {
    this.populateForm(element);
    this.openDialogWindow();
  }

  populateForm(element: any): void {
    this.service.formData = Object.assign({}, element);
  }

  onDelete(elementId: number): void{
    this.dialogService.openConfirmDialog('Are you sure to delete this record?')
      .afterClosed().subscribe(res => {
        if (res){
          this.service.deleteService(elementId).subscribe(
              data => {
                this.updateDataSource();
                this.notificationService.warn('Deleted successfully !');
              },
              err => {console.log(err); }
            );
        }
    });
  }

  onEmailSend(elementId: number): void{
    this.dialogService.openConfirmDialog('Are you sure for sending all clients notification email?')
      .afterClosed().subscribe(res => {
        if (res){
          this.service.sendMessage(elementId).subscribe(
            data => {
              this.notificationService.success('Messages send successfully !');
            },
            err => {console.log(err); }
          );
        }
    });
  }

  expandDescription(element: any): void{
    this.openStatus = !this.openStatus;
    const elem = document.getElementById(element.id);
    if (!this.openStatus){
      // @ts-ignore
      elem.classList.add('opened');
    }
    else{
      // @ts-ignore
      elem.classList.remove('opened');
    }
  }

}


import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/models/doctor/animal';
import { AnimalType } from 'src/app/models/doctor/animalType';
import { Filter } from 'src/app/models/queries/filter';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { AddAnimalComponent } from 'src/app/modules/client/add-animal/add-animal.component';
import { MatDialog } from '@angular/material/dialog';
import { PageResponse } from 'src/app/models/doctor/pageResponse';
import { Client } from 'src/app/models/client/client';
import { ClientMainInfoComponent} from 'src/app/modules/client/client-main-info/client-main-info.component'


@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.css']
})

export class ClientComponent implements OnInit {

  activeAnimal!:number;
  animals!:Animal[]  
  animalTypeId!:number;
  animalTypes!:AnimalType[];  
  id!:number;

    animalData!: Animal;

    client!: Client;

    constructor(public dialog: MatDialog, public authService: AuthService, public apiService: ApiService) {
        if (this.authService.isLogedIn()) {
            this.initializeClient();
        } else {
            console.log('mistake happened');
        }
    }

    ngOnInit(): void {
    }

    initializeAnimal(clientId: number) {
        let params: Filter = { 'clientId': clientId.toString() };

        this.apiService.getEntity('animals', params).subscribe((data: PageResponse) => {
            this.animals = data.data;               
            this.getAnimalTypeData();          
    }) 
    }

  initializeClient()
  {
    let id: string = this.authService.userData.sub;
    let filter: Filter = {"UserId": id};
    this.apiService.getEntity("clients", filter).subscribe((response) =>
      {
        this.client = response.data[0];  
        this.initializeAnimal(response.data[0].id)      
      },
      error =>
      console.log("error : " + error));    
  }
  
  getAnimalTypeData(){
  this.apiService.getEntity('animaltypes').subscribe((response)=>{
    this.animalTypes=response.data;
    //alert(this.animalTypes[0].animalTypeName);   
   })
    
  }
    notActiveAnimal(active: any) {
        this.activeAnimal = active;
    }

    changeAnimal(changeAnimal:Animal){
        if(changeAnimal.isDeleted)
        {
            this.animals= this.animals.filter(animal=>animal.id!=changeAnimal.id);
        }
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AddAnimalComponent, {
            width: '250px',
            data: this.animalData
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === null || result === undefined) {
                return;
            }
            this.getAnimalTypeData();
            this.animals.push(result);
        });
    }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

import { Animal } from '../../../models/doctor/animal';
import { AnimalType } from '../../../models/animals/animalType';
import { AnimalPost } from '../../../models/animals/animalPost';


@Component({
    selector: 'app-add-animal',
    templateUrl: './add-animal.component.html',
    styleUrls: ['./add-animal.component.css'],
})
export class AddAnimalComponent implements OnInit {
    animalGroup!: FormGroup;

    animalTypes!: AnimalType[];

    animalNameControl = new FormControl('', [Validators.required]);
    animalAgeControl = new FormControl(null, [Validators.required]);
    animalTypeControl = new FormControl('', [Validators.required]);

    public constructor(
        public dialogRef: MatDialogRef<AddAnimalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Animal,
        private apiService: ApiService, private authService: AuthService) {
        this.animalGroup = new FormGroup({
            animalName: this.animalNameControl,
            animalAge: this.animalAgeControl,
            animalType: this.animalTypeControl,
        });
    }

    public ngOnInit(): void {
        this.getAnimalTypes();
    }

    private getAnimalTypes(): void {
        this.apiService.getEntity('animalTypes')
            .subscribe(res => {
                this.animalTypes = res.data;
            });
    }

    public onSubmit(): void {
        const userId = this.authService.userData.sub;
        let clientId!: number;
        this.apiService.getEntity('clients', { userId })
            .subscribe(res => {
                clientId = res.data[0].id;

                const animal: AnimalPost = {
                    clientId,
                    animalTypeId: this.animalTypeControl.value,
                    name: this.animalNameControl.value,
                    age: this.animalAgeControl.value,
                    photo: ''
                };
                this.apiService.addEntity('animals', animal)
                    .subscribe(res2 => {
                            this.data = {
                                id: res2.data.id,
                                photo: res2.data.photo,
                                name: res2.data.name,
                                age: res2.data.age,
                                animalTypeId: res2.data.animalTypeId,
                                animalTypeName: res2.data.animalTypeName,
                                client: res2.data.client,
                                isDeleted:false
                            };
                            this.dialogRef.close(this.data);
                            console.log(res2);
                        },
                        error => {
                            console.log(error);
                        });
            });
    }

    public onNoClick(): void {
        this.dialogRef.close(null);
    }
}

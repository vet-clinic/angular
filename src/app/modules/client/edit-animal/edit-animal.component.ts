import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimalPost } from 'src/app/models/animals/animalPost';
import { AnimalType } from 'src/app/models/animals/animalType';
import { EditAnimal } from 'src/app/models/animals/editAnimal';
import { Animal } from 'src/app/models/doctor/animal';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-edit-animal',
    templateUrl: './edit-animal.component.html',
    styleUrls: ['./edit-animal.component.css']
})
export class EditAnimalComponent implements OnInit {
    animalGroup!: FormGroup;

    animalTypes!: AnimalType[];

    animalData!: Animal;

    animalNameControl = new FormControl('', [Validators.required]);
    animalAgeControl = new FormControl(null, [Validators.required]);
    animalTypeControl = new FormControl('', [Validators.required]);

    public constructor(
        public dialogRef: MatDialogRef<EditAnimalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Animal,
        private apiService: ApiService) {
        this.animalData = data;
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

        const animal: EditAnimal = {
            animalTypeId: this.animalTypeControl.value,
            name: this.animalNameControl.value,
            age: this.animalAgeControl.value,
            photo: ''
        };

        this.apiService.updateEntity('animals', (this.animalData.id ? this.animalData.id : 0), animal)
            .subscribe(() => {
                this.data = {
                    id: this.animalData.id,
                    photo: animal.photo,
                    name: animal.name,
                    age: animal.age,
                    animalTypeId: animal.animalTypeId,
                    animalTypeName: this.animalTypes.find(x => x.id == this.animalTypeControl.value)!.animalTypeName,
                    client: this.animalData.client,
                    isDeleted: false
                };
                this.dialogRef.close(this.data);
                console.log(this.data);
            },
                error => {
                    console.log(error);
                });
    }

    public onNoClick(): void {
        this.dialogRef.close(null);
    }

}

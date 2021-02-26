import { Client } from "./client";

export interface Animal{
    id:number | null;
    photo:string;
    name:string;
    age:number;
    client:Client;
    animalTypeId:number;
    animalTypeName:string;
    isDeleted:boolean;
}
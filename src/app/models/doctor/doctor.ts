import { Appointment } from "./appointment";

export interface Doctor{
    id:number | null;
    userId:string;
    userName:string;
    firstName:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    education:string;
    biography:string;
    experience:string;
    photo:string;
    positionId:number;
    positionName:string;
    isDeleted:boolean;
}
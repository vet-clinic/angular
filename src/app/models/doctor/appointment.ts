import { Animal } from "./animal";
import { Client } from "./client";
import { Doctor } from "./doctor";
import { PerformedProcedure } from "./performedProcedure";
import { Service } from "./service";
import { Status } from "./status.enum";

export interface Appointment{
    id:number | null;
    client:Client;
    animal:Animal;
    service:Service;
    status:Status;
    doctor:Doctor;
    performedProcedures:PerformedProcedure;
    appointmentDate:Date;
    complaints:string;
    treatmentDescription:string;
}
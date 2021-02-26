import { Animal } from './animal';
import { Client } from './client';
import { Doctor } from './doctor';
import { Procedure } from './procedure';
import { Service } from './service';
import { Status } from './status';

export interface Appointment {
    id: number;
    client: Client;
    animal: Animal;
    service: Service;
    status: Status;
    doctor: Doctor;
    performedProcedures: Procedure[];
    appointmentDate: string;
    complaints: string;
    treatmentDescription: string;
}

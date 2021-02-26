export interface AppointmentPut {
    animalId: number;
    serviceId: number;
    statusId: number;
    doctorId: number;
    proceduresIds: number[];
    appointmentDate: string;
    complaints: string;
    treatmentDescription: string;
}

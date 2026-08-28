export interface ICreateRentalRequestPayload {
  propertyId: string;
  moveInDate: Date;
  leaseDuration: number;
  message?: string;
}

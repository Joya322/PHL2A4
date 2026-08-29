import { RentalRequestStatus } from "../../../generated/prisma/enums";

export interface ICreatePropertyPayload {
  categoryId: string;
  title: string;
  description: string;
  address: string;
  city: string;
  area?: string;
  rentAmount: number;
  bedrooms: number;
  bathrooms: number;
  size?: number;
  furnished?: boolean;
  availableFrom: Date | string;
  isAvailable?: boolean;
  imageUrl?: string;
}
export interface IUpdatePropertyPayload {
  categoryId?: string;
  title?: string;
  description?: string;
  address?: string;
  city?: string;
  area?: string;
  rentAmount?: number;
  bedrooms?: number;
  bathrooms?: number;
  size?: number;
  furnished?: boolean;
  availableFrom?: Date | string;
  isAvailable?: boolean;
  imageUrl?: string;
}

export interface IChangeStatusPayload {
  status?: RentalRequestStatus;
}

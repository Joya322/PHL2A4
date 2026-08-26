import { PropertyWhereInput } from "../../../generated/prisma/models";

export interface IAddPropertyPayload {
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

export interface IPropertyQuery extends PropertyWhereInput{
  sortBy?: string;
  sortOrder?: string;
  minPrice?: string;
  maxPrice?: string;
  price?: string;
}

import { PropertyWhereInput } from "../../../generated/prisma/models";



export interface IPropertyQuery extends PropertyWhereInput{
  sortBy?: string;
  sortOrder?: string;
  minPrice?: string;
  maxPrice?: string;
  price?: string;
}

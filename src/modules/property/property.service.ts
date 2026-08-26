import { prisma } from "../../lib/prisma";
import { IAddPropertyPayload } from "./property.interface";

const addPropertyIntoDB = async (payload: IAddPropertyPayload, landlordId: string) => {
  const property = await prisma.property.create({
    data: {
      ...payload,
      landlordId
    }
  });

  return property
};
const getPropertiesFromDB = () => {};
const getPropertyFromDB = () => {};
const getAllPropertyCategoriesFromDB = () => {};

export const propertyServices = {
  addPropertyIntoDB,
  getPropertyFromDB,
  getAllPropertyCategoriesFromDB,
  getPropertiesFromDB,
};

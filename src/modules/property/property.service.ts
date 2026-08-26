import { IAddPropertyPayload } from "./property.interface";

const addPropertyIntoDB = async(payload: IAddPropertyPayload) => {};
const getPropertiesFromDB = () => {};
const getPropertyFromDB = () => {};
const getAllPropertyCategoriesFromDB = () => {};

export const propertyServices = {
  addPropertyIntoDB,
  getPropertyFromDB,
  getAllPropertyCategoriesFromDB,
  getPropertiesFromDB,
};

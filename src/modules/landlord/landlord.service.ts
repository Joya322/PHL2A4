import { prisma } from "../../lib/prisma";
import { ICreatePropertyPayload } from "./landlord.interface";

const createPropertyIntoDB = async (
  payload: ICreatePropertyPayload,
  landlordId: string,
) => {
  // const property = await prisma.property.create({
  //   data: {
  //     ...payload,
  //     landlordId,
  //   },
  // });

  // return property;
};
const updatePropertyIntoDB = async () => {};
const deletePropertyFromDB = async () => {};
const getAllRentalRequestsFromDB = async () => {};
const modifyRentalRequestIntoDB = async () => {};

export const landlordServices = {
  createPropertyIntoDB,
  updatePropertyIntoDB,
  deletePropertyFromDB,
  getAllRentalRequestsFromDB,
  modifyRentalRequestIntoDB,
};

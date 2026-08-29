import { Request, Response } from "express";
import { ICreateRentalRequestPayload } from "./rentalRequest.interface";
import { prisma } from "../../lib/prisma";

const createRentalRequestIntoDB = async (
  tenantId: string,
  payload: ICreateRentalRequestPayload,
) => {
  const { propertyId } = payload;

  const isPropertyExist = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
    include: {
      rentalRequests: {
        select: {
          tenantId: true,
        },
      },
    },
  });

  if (!isPropertyExist) {
    throw new Error("No such property exist.");
  }

  const { landlordId, isAvailable } = isPropertyExist;

  if (!isAvailable) {
    throw new Error("Sorry! This property is not available now.");
  }

  const rentalRequests = isPropertyExist.rentalRequests;

  rentalRequests.map((request) => {
    if (request.tenantId === tenantId) {
      throw new Error(
        "You have already submitted a rental request for this property.",
      );
    }
  });

  const rentalRequest = await prisma.rentalRequest.create({
    data: {
      ...payload,
      landlordId,
      propertyId,
      tenantId,
    },
  });

  return rentalRequest;
};

const getAllRentalRequestsFromDB = async () => {};
const getRentalRequestFromDB = async () => {};

export const rentalRequestService = {
  createRentalRequestIntoDB,
  getAllRentalRequestsFromDB,
  getRentalRequestFromDB,
};

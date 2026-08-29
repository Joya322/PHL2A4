import { Request, Response } from "express";
import { ICreateRentalRequestPayload } from "./rentalRequest.interface";
import { prisma } from "../../lib/prisma";
import { UserRole } from "../../../generated/prisma/enums";

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

const getAllRentalRequestsFromDB = async (userId: string, userRole: string) => {
  if (userRole === UserRole.ADMIN) {
    console.log(userRole);
    return await prisma.rentalRequest.findMany();
  } else if (userRole === UserRole.LANDLORD) {
    console.log(userRole);
    return await prisma.rentalRequest.findMany({
      where: {
        landlordId: userId,
      },
    });
  } else {
    return await prisma.rentalRequest.findMany({
      where: {
        tenantId: userId,
      },
    });
  }
};
const getRentalRequestByIdFromDB = async (id: string, userId: string) => {
  const isRentalRequestExist = await prisma.rentalRequest.findUnique({
    where: {
      id,
    },
    include: {
      landlord: true,
      tenant: true,
    },
  });

  if (!isRentalRequestExist) {
    throw new Error("No such rental request found.");
  }

  const { landlordId, tenantId } = isRentalRequestExist;

  if (
    userId !== UserRole.ADMIN &&
    userId !== landlordId &&
    userId !== tenantId
  ) {
    throw new Error("You have no permission to access this resource.");
  }

  return isRentalRequestExist;
};

export const rentalRequestServices = {
  createRentalRequestIntoDB,
  getAllRentalRequestsFromDB,
  getRentalRequestByIdFromDB,
};

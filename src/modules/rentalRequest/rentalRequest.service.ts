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

const getAllRentalRequestsFromDB = async (
  userId: string,
  userRole: UserRole,
) => {
  let rentalRequests = {};

  if (userRole === UserRole.ADMIN) {
    rentalRequests = await prisma.rentalRequest.findMany();
  } else if (userRole === UserRole.LANDLORD) {
    rentalRequests = await prisma.rentalRequest.findMany({
      where: {
        landlordId: userId,
      },
    });
  } else {
    rentalRequests = await prisma.rentalRequest.findMany({
      where: {
        tenantId: userId,
      },
    });
  }

  if (!rentalRequests) {
    throw new Error("No rental requests found.");
  }

  return rentalRequests;
};

const getRentalRequestByIdFromDB = async (
  rentalRequestId: string,
  userId: string,
  userRole: UserRole,
) => {
  let rentalRequest = await prisma.rentalRequest.findUnique({
    where: {
      id: rentalRequestId,
    },
  });

  if (!rentalRequest) {
    throw new Error("No such rental request found.");
  }

  if (userRole === UserRole.ADMIN) {
    rentalRequest = await prisma.rentalRequest.findUnique({
      where: {
        id: rentalRequestId,
      },
    });
  } else if (userRole === UserRole.LANDLORD) {
    rentalRequest = await prisma.rentalRequest.findUnique({
      where: {
        id: rentalRequestId,
        landlordId: userId,
      },
    });
  } else {
    rentalRequest = await prisma.rentalRequest.findUnique({
      where: {
        id: rentalRequestId,
        tenantId: userId,
      },
    });
  }

  if (!rentalRequest) {
    throw new Error("You have no permission to access this resource.");
  }

  return rentalRequest;
};

export const rentalRequestServices = {
  createRentalRequestIntoDB,
  getAllRentalRequestsFromDB,
  getRentalRequestByIdFromDB,
};

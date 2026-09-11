import { PropertyWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IPropertyQuery } from "../property/property.interface";
import { IUpdateStatusPayload } from "./admin.interface";

const getAllUsersFromDB = async () => {
  const allUsers = await prisma.user.findMany({
    include: {
      rentalRequestsAsTenant: true,
      rentalRequestsAsLandlord: true,
      properties: true,
      reviews: true,
    },
    omit: {
      password: true,
    },
  });
  return allUsers;
};

const updateUserStatusIntoDB = async (
  payload: IUpdateStatusPayload,
  userId: string,
) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!isUserExist) {
    throw new Error("No such user found.");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      ...payload,
    },
  });

  return updatedUser;
};

const getAllPropertiesFromDB = async (query: IPropertyQuery) => {
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";
  const sortBy = query.sortBy ? query.sortBy : "createdAt";

  const where: PropertyWhereInput = {};

  if (query.city) {
    where.city = {
      contains: query.city as string,
      mode: "insensitive",
    };
  }

  if (query.minPrice || query.maxPrice || query.price) {
    where.rentAmount = {
      ...(query.minPrice && { gte: Number(query.minPrice) }),
      ...(query.maxPrice && { lte: Number(query.maxPrice) }),
      ...(query.price && { lte: Number(query.price) }),
    };
  }

  if (query.categoryId) {
    where.categoryId = query.categoryId;
  }

  const allProperties = await prisma.property.findMany({
    where,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      landlord: {
        omit: {
          password: true,
        },
      },
      rentalRequests: true,
      reviews: true,
      category: true,
    },
  });

  return allProperties;
};

const getAllRentalRequestsFromDB = async () => {
  let rentalRequests = await prisma.rentalRequest.findMany({
    include: {
      property: true,
      tenant: {
        omit: {
          password: true,
        },
      },
      landlord: {
        omit: {
          password: true,
        },
      },
      payment: true,
    },
  });

  if (!rentalRequests) {
    throw new Error("No rental requests found.");
  }

  return rentalRequests;
};

export const adminServices = {
  getAllUsersFromDB,
  updateUserStatusIntoDB,
  getAllPropertiesFromDB,
  getAllRentalRequestsFromDB,
};

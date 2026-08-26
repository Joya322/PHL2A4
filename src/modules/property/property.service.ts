import { PropertyWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IAddPropertyPayload, IPropertyQuery } from "./property.interface";

const addPropertyIntoDB = async (
  payload: IAddPropertyPayload,
  landlordId: string,
) => {
  const property = await prisma.property.create({
    data: {
      ...payload,
      landlordId,
    },
  });

  return property;
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
    },
  });

  return allProperties;
};

const getPropertyFromDB = () => {};
const getAllPropertyCategoriesFromDB = () => {};

export const propertyServices = {
  addPropertyIntoDB,
  getAllPropertiesFromDB,
  getPropertyFromDB,
  getAllPropertyCategoriesFromDB,
};

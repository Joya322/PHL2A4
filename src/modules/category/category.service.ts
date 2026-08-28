import { prisma } from "../../lib/prisma";
import {
  ICreateCategoryPayload,
  IUpdateCategoryPayload,
} from "./category.interface";

const createCategoryIntoDB = async (payload: ICreateCategoryPayload) => {
  const { name } = payload;

  const isExist = await prisma.category.findFirst({
    where: {
      name,
    },
  });

  if (isExist) {
    throw new Error("This category is already exist.");
  }

  const category = await prisma.category.create({
    data: {
      ...payload,
    },
  });

  return category;
};



const getPropertyCategoryByIdFromDB = async (categoryId: string) => {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    throw new Error("No such category exist.");
  }

  return category;
};

const updatePropertyCategoryIntoDB = async (
  categoryId: string,
  payload: IUpdateCategoryPayload,
) => {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    throw new Error("No such category exist.");
  }

  const { name } = payload;
  const isExist = await prisma.category.findFirst({
    where: {
      name,
    },
  });

  if (isExist) {
    throw new Error("This category is already exist.");
  }

  const updatedCategory = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      ...payload,
    },
  });

  return updatedCategory;
};

const deletePropertyCategoryFromDB = async (categoryId: string) => {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    throw new Error("No such category exist.");
  }

  await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
};

export const categoryServices = {
  createCategoryIntoDB,
  getPropertyCategoryByIdFromDB,
  updatePropertyCategoryIntoDB,
  deletePropertyCategoryFromDB,
};

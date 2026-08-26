import { prisma } from "../../lib/prisma";
import { IAddCategoryPayload } from "./category.interface";


const addPropertyCategoryIntoDB = async (payload: IAddCategoryPayload) => {
  const { name } = payload;

  
  const isExist = await prisma.category.findFirst({
    where: {
      name
    }
  })

  if (isExist) {
    throw new Error("This category is already exist.");
  }

  const category = await prisma.category.create({
    data: {
      ...payload
    }
  })

  return category;
 };

const getAllPropertyCategoriesFromDB = async () => {
  const allCategories = await prisma.category.findMany();

  return allCategories;
 };
// const getPropertiesFromDB = () => {};
// const getPropertyFromDB = () => {};

export const categoryServices = {
  addPropertyCategoryIntoDB,
  getAllPropertyCategoriesFromDB,
  // getPropertyFromDB,
  // getPropertiesFromDB,
};

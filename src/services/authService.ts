import bcrypt from "bcryptjs";
import { prismaClient } from "../config/database";

export const createUser = async (username: string, password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prismaClient.user.create({
      data: { username, password: hashedPassword },
    });
    return user;
  } catch (err) {
    throw Error(`Something went wrong: ${err}`);
  }
};

export const verifyLogin = async (username: string, password: string) => {
  const user = await prismaClient.user.findUnique({ where: { username } });
  if (!user) {
    throw Error("User not found");
  }

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    throw Error("Invalid password");
  }
  return user;
};

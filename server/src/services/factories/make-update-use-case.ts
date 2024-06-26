import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { UpdateUserUseCase } from "../users/update-user";

export function makeUpdateUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository);

  return updateUserUseCase;
}

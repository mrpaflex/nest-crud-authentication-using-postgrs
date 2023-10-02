import { CreateUserEntity } from "src/entities/user.entity";

export type UserType = Omit<CreateUserEntity, 'hashPassword'>;
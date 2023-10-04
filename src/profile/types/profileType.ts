
import { UserType } from "src/user/types/user.types";

export type ProfileType = UserType & {
    following: boolean
};
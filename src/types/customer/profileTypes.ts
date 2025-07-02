import { User } from "../user";

export interface ProfileApiResponse {
  message: string;
  user: User;
}
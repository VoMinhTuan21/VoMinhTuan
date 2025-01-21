import { UserStatus } from "../entities/user";
import { number, object, string } from "yup";
const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

export interface CreateUserDTO {
  email: string;
  name: string;
  phoneNumbers: string;
}

export const CreateUserSchema = object({
  email: string().email(),
  name: string(),
  phoneNumbers: string().matches(phoneRegExp, 'Phone number is not valid')
});

export type UpdateUserDTO = Partial<CreateUserDTO> & { status?: UserStatus, id: number }

export const UpdateUserSchema = object({
  id: number().min(1).required(),
  email: string().optional().email(),
  name: string().optional(),
  phoneNumbers: string().optional().matches(phoneRegExp, 'Phone number is not valid'),
  status: string().optional()
})

export class UserFilter {
  keyword?: string;
  status?: UserStatus
}
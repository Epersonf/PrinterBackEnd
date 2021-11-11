import UserRole from "../entities/role.type";

export class CreateUserDto {
  name: string;
  email: string;
  cpf: string;
  phoneNumber: string;
  password: string;
  role?: UserRole;
  
  constructor(name: string, email: string, cpf: string, phoneNumber: string, password: string, role: UserRole = UserRole.USER) {
    this.name = name;
    this.email = email;
    this.cpf = cpf;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.role = role;
  }
}

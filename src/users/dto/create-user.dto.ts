export class CreateUserDto {
  name: string;
  email: string;
  cpf: string;
  phoneNumber: string;
  password: string;
  
  constructor(name: string, email: string, cpf: string, phoneNumber: string, password: string) {
    this.name = name;
    this.email = email;
    this.cpf = cpf;
    this.phoneNumber = phoneNumber;
    this.password = password;
  }
}

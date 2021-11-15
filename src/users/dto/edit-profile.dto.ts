export class EditProfileDto {
  name: string;
  phoneNumber: string;
  password: string;
  
  constructor(name: string, phoneNumber: string, password: string) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.password = password;
  }
}

export default EditProfileDto;

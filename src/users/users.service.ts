import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./entities/user.entity";

import * as bcrypt from "bcrypt";
const saltRounds = 10;

import * as jwt from "jsonwebtoken";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto): any {
    const user = new this.userModel(createUserDto);
    user.password = bcrypt.hashSync(user.password, saltRounds);
    return user.save();
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email }).exec();
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({
        "id": user.id,
        "password": user.password
      }, process.env.SECRET || "SECRET_DEFAULT", {
        expiresIn: 604800
      });
      return { token };
    }
    return { msg: "invalid_login" };
  }

  findAll(): any {
    return this.userModel.find();
  }

  findOne(id: number): any {
    return this.userModel.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto): any {
    return this.userModel.findByIdAndUpdate({ _id: id }, { $set: updateUserDto }, { new: true });
  }

  remove(id: number): any {
    return this.userModel.remove(id);
  }
}

import { HttpException, HttpStatus, Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./entities/user.entity";

import * as bcrypt from "bcrypt";
const saltRounds = 10;

import * as jwt from "jsonwebtoken";

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  onModuleInit() {
    if (this.userModel.findOne({ email: process.env.FIRM_EMAIL }))
      return;
    const user = new this.userModel(new CreateUserDto(
      "Admin", process.env.FIRM_EMAIL, "111.111.111-11", "+00 (00) 0000-0000", "admin2021"
    ));
    user.save();
  }

  create(createUserDto: CreateUserDto): any {
    const user = new this.userModel(createUserDto);
    user.password = bcrypt.hashSync(user.password, saltRounds);
    user.save();
    user.password = "undefined";
    return user;
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user == null) throw new HttpException("user_not_found", HttpStatus.NOT_FOUND);

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({
        "id": user.id,
        "role": user.role
      }, process.env.SECRET || "SECRET_DEFAULT", {
        expiresIn: 604800
      });
      return { token };
    }

    throw new HttpException("invalid_login", HttpStatus.UNAUTHORIZED);
  }

  findAll(): any {
    return this.userModel.find();
  }

  findOne(id: string): any {
    return this.userModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto): any {
    return this.userModel.findByIdAndUpdate({ _id: id }, { $set: updateUserDto }, { new: true });
  }

  remove(id: string): any {
    return this.userModel.deleteOne({ id });
  }
}

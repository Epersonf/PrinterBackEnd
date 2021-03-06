import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./entities/user.entity";

import * as bcrypt from "bcrypt";
const saltRounds = 10;

import * as jwt from "jsonwebtoken";
import UserRole from "./entities/role.type";
import { showModelPagination } from "src/utility/pagination";
import EditProfileDto from "./dto/edit-profile.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    this.userModel.findOne({ email: process.env.FIRM_EMAIL }).exec().then(e => {
      if (e == undefined) {
        const user = new this.userModel(new CreateUserDto(
          "Admin", process.env.FIRM_EMAIL, "111.111.111-11", "+00 (00) 0000-0000", "admin2021", UserRole.ADMIN
        ));
        user.save((err) => {
          if (!err) {
            console.log("Super User created");
          } 
        });
      }
    });
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const user = new this.userModel(createUserDto);
    user.password = bcrypt.hashSync(user.password, saltRounds);
    try {
      await user.save();
    } catch {
      throw new HttpException("already_exists", HttpStatus.CONFLICT);
    }
    user.password = undefined;
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
      user.password = undefined;
      return { user, token };
    }

    throw new HttpException("invalid_login", HttpStatus.UNAUTHORIZED);
  }

  async findAll(query: any): Promise<User[]> {
    const result = await showModelPagination<UserDocument>(query, this.userModel, "-password");
    return result;
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).select("-password");
  }

  update(id: string, updateUserDto: UpdateUserDto): any {
    return this.userModel.findByIdAndUpdate({ _id: id }, { $set: updateUserDto }, { new: true });
  }

  editProfile(idComp: string, id: string, editProfileDto: EditProfileDto): any {
    if (idComp != id) throw new HttpException("must_be_account_owner", HttpStatus.UNAUTHORIZED);
    return this.userModel.findByIdAndUpdate({ _id: id }, { $set: editProfileDto }, { new: true });
  }

  remove(id: string): any {
    return this.userModel.deleteOne({ id });
  }
}

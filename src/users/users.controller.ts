import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Headers } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import EditProfileDto from "./dto/edit-profile.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  create(@Body() createUserDto: CreateUserDto): any {
    return this.usersService.create(createUserDto);
  }

  @Post("login")
  login(@Body() loginUserDto: LoginUserDto): any {
    return this.usersService.login(loginUserDto.email, loginUserDto.password);
  }

  @Get("find/")
  findAll(@Query() query): any {
    return this.usersService.findAll(query);
  }

  @Get("find/:id")
  findOne(@Param("id") id: string): any {
    return this.usersService.findOne(id);
  }

  @Patch("patch/:id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto): any {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch("edit_profile/:id")
  editProfile(@Headers("id") idComp: string, @Param("id") id: string, @Body() editProfileDto: EditProfileDto) {
    return this.usersService.editProfile(idComp, id, editProfileDto);
  }

  @Delete("delete/:id")
  remove(@Param("id") id: string): any {
    return this.usersService.remove(id);
  }
}

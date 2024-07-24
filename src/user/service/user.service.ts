import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { createSecureServer } from 'http2';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user/user.schemas';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  //   // Create user API
  //     async createUser (user: User) : Promise<User> {
  //     const { name,email,password,confirmPassword} = user;
  //    const hashedPassword =await bcrypt.hash(password,10);
  //    if (password !== confirmPassword) {
  //     throw new BadRequestException ("Password and confirm password don't match")
  //    }

  //        const isUserAlreadyRegistered = (await this.userModel.findOne({email}))
  //        if (isUserAlreadyRegistered) {
  //           throw new ConflictException ('User is already registered with the given email')
  //        }
  //        const createUser = new this.userModel({name,email,password:hashedPassword, confirmPassword,phone});
  //        return createUser.save();
  //        }
  //        //Find User By Email
  //        async findAll(): Promise<User[]>{
  //         const user = await this.userModel.find();
  //        return user;
  //     }
  //     async findUserById(id:String) : Promise<User[]>{
  //         const user = (await this.userModel.findOne({_id:id}))
  //         console.log(user)
  //         return user;
  //     }
  // // Method to update a user by ID
  // async updateUser(id:string,updateData:Partial<User>): Promise<User>{

  // }
  // }

  // function InjectModel(name: any): (target: typeof UserService, propertyKey: undefined, parameterIndex: 0) => void {
  //     throw new Error("Function not implemented.");
}

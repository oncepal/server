import { User } from "../schemas/user.schema";

export class CreateUserDto {
    readonly name: string;
    readonly wxAccount: string;
    readonly age: string;
}

export class UserProfileDto {
    name: string;
    wxAccount: string;
    age:string
}


export function getUserProfile(users:User[]){
   return users.map(u => {
        const userProfile = new UserProfileDto();
        for (const key in userProfile) {
          if (Object.prototype.hasOwnProperty.call(userProfile, key)) {
            userProfile[key] = u[key];
          }
        }
        return userProfile
      })
}
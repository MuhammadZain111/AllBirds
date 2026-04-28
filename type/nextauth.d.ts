
import "next-auth"
import { DefaultSession } from "next-auth";

declare module 'next-auth'
{
interface User{
 id?:string;
 isVerfied?:boolean;
 isAcceptingMessages?:boolean;
 username?:string;
}


interface Session{
    user:{      
        _id?:string;
        isverified?:boolean;
        isAcceptingMessages?:boolean;
        username?:string;     
    }&DefaultSession['user'];
}

}


declare module 'next-auth/jwt'
{ 
    interface JWT{
    user:{
        
        id_?:string;
        isverified?:boolean;
        isAcceptingMessages?:boolean;
        username?:string;     
    }&DefaultSession['user'];
}
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../User.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
  constructor(private userService:UserService,private router:Router){}

 
  email:any;
  mobile:any;
  editMode:boolean=false;
  user = new User();
  existsUser = new User();
  confirmpassword:any;

  getUser(email:string,mobile:string)
  {
    this.userService.getUserByEmailAndMobile(email,mobile).subscribe(
      data=>{
        if(data)
        {
          this.editMode=true;
          this.existsUser = data;
        }
        else{
          alert('invalid input/not registered');
          return ;
        }
      },
      error=>{console.log(error)}
    )
  }

  updatePassword(user:User)
  {
    this.editMode=false;
    if(user.password != this.confirmpassword)
    {
      alert("password not matched");
      return;
    }
    this.userService.updatePassword(user).subscribe(
      data=>{
        alert('password updated');
        data=this.existsUser;
        
        this.router.navigate(['/login'])
      },
      error=>{console.log(error);}
    );
  }
  
  edit()
  {
    if(this.editMode==false)
    {
      this.editMode=true;
    }
    else this.editMode=false;
    
  }

}

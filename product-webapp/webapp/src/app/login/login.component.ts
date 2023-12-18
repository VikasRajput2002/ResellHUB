import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../home/auth.service';
import { User } from './User.model';
import { UserService } from './user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userService:UserService,private router:Router,private authService:AuthService){}
  user = new User();
  user1=new User();
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  
  login()
  {
    let authRequest ={email:this.user.email,password:this.user.password};
    this.userService.login(authRequest).subscribe(
      data=>{
        if(data)
        {
          this.userService.getUserByEmailPassword(this.user.email,this.user.password).subscribe(
            data1=>{this.user1=data1;
            console.log(this.user1.userId);
            localStorage.setItem('userId',this.user1.userId);
            localStorage.setItem('name',this.user1.name);

            localStorage.setItem('token', data);
            localStorage.setItem('email',this.user.email);
            localStorage.setItem('password',this.user.password);
            this.router.navigate(['']);
            this.authService.setLoggedIn(true);

          }
          );
         
        }
        
        else{
          alert('Invalid email/password');
          return ;
        }
      },
      error=>{console.log(error);}
    )
  }

}

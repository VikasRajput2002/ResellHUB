import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/login/User.model';
import { UserService } from 'src/app/login/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
name: any;
  constructor(private userService:UserService, private router:Router){}
  user = new User();
  confirmpassword:any;
  register()
  {
    if(this.user.password != this.confirmpassword)
    {
      alert('password does not matched !');
      return;
    }

    this.userService.addUser(this.user).subscribe(
      data=>{
        this.user = data;
        alert(`${this.user.name} registered successfully`);
        this.router.navigate(['/login']);
        this.sendConfirmationEmail(this.user);

      },
      error=>{console.log(error);}
    )
  }

  sendConfirmationEmail(user: User) {
    this.userService.sendRegistrationEmail(user).subscribe(
      () => {
        console.log('Confirmation email sent successfully');
      },
      (error) => {
        console.error('Error sending confirmation email:', error);
      }
    );
  }
}

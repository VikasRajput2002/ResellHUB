import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  user: any;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
  
    if (userId) {
      this.userService.getUserProfile(userId).subscribe(data => {
        this.user = data;
        this.user.profileImage = `data:image/jpeg;base64,${this.user.profileImage}`;
        console.log(this.user);
      });
    } else {
      console.error('User ID not found in local storage.');
    }
    
  }
  

  getUserProfileImage(): string {
    if (this.user && this.user.profileImage) {
      if (typeof this.user.profileImage === 'string') {
        return this.user.profileImage;
      } else if (Array.isArray(this.user.profileImage)) {
        const base64Data = btoa(String.fromCharCode.apply(null, this.user.profileImage));
        return `data:image/png;base64,${base64Data}`;
      }
    }
    return 'assets/image.jpeg';
  }
}

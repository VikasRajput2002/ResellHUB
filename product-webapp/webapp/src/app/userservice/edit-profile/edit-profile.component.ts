import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Import Router
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: any = {};
  errorUpdatingProfile: string | null = null;
  selectedProfileImage: File | null = null;

  constructor(
    private userService: UserService,
    private router: Router  // Inject Router
  ) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    if (userId) {
      this.userService.getUserProfile(userId).subscribe(data => {
        this.user = data;
        this.user.profileImage = `data:image/jpeg;base64,${this.user.profileImage}`;
      });
    } else {
      console.error('User ID not found in local storage.');
    }
  }

  updateProfile(): void {
    const formData = new FormData();

    formData.append('userId', this.user.userId);
    formData.append('name', this.user.name);
    formData.append('mobile', this.user.mobile.toString());
    formData.append('gender', this.user.gender);
    formData.append('address', this.user.address);

    if (this.selectedProfileImage) {
      formData.append('profileImage', this.selectedProfileImage, this.selectedProfileImage.name);
    }

    this.userService.updateUserProfile(this.user.userId, formData).subscribe(
      updatedUser => {
        this.user = updatedUser;
        this.user.profileImage = `data:image/jpeg;base64,${this.user.profileImage}`;
        console.log('Profile updated successfully:', this.user);
        this.errorUpdatingProfile = null;

        // Navigate to the view-profile route after a successful update
        this.router.navigate(['/view-profile']);
      },
      error => {
        console.error('Error updating profile:', error);
        console.error('Error updating profile - detailed error:', error.error);
        console.error('HTTP error:', error.status, error.statusText);
        this.errorUpdatingProfile = 'An error occurred while updating the profile. Please try again.';
      }
    );
  }

  onProfileImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedProfileImage = file;
    }
  }

  onEditProfileImage(): void {
    console.log('Editing profile image...');
  }

  getUserProfileImage(): string {
    if (this.user && this.user.profileImage) {
      if (typeof this.user.profileImage === 'string') {
        return this.user.profileImage;
      } else if (this.user.profileImage instanceof File) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.user.profileImage = e.target.result;
        };
        reader.readAsDataURL(this.user.profileImage);
        return '';
      }
    }
    return 'assets/image.jpeg';
  }
}

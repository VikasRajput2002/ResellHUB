import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
// import { ProductService } from '../add-product/product.service';
// import { ImageService } from '../userservice/image.service';
import { AuthService } from '../home/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn = false;
  isDropdownOpen = false;
  defaultProfileImageUrl = 'assets/profile-user.png'; 

  constructor(
    private router: Router,
    public authService: AuthService,
  ) {}

  ngOnInit() {
  }


  login() {
    this.router.navigate(['/login']);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  viewProfile() {
    this.router.navigate(['/view-profile']);
  }

  editProfile() {
    this.router.navigate(['chat']);
  }

  viewslot() {
    this.router.navigate(['view-booked-slots']);
  }

searchQuery:String=''
searchResults: any[] = [];
products: any[] = []

search() {
  console.log(this.searchQuery)
  // window.location.reload();

  if (this.searchQuery.trim() !== '') {
    
    this.router.navigate(['/search'], {
      queryParams: { term: this.searchQuery },
    });
  }
}


logout() {
  this.authService.logout();
  this.router.navigate(['/login']); 
}

categories =['car','mobile', 'laptop','bikes','furniture','fashion']
  redirectToCategory(productCategory: string) {
    this.router.navigate(['category', productCategory]);
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../add-product/product.service';
import { RazorpayService } from '../payment/razorpay.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {
  dataArray: any[]=[];
  products: any[]=[];

  constructor(private route: ActivatedRoute, private razorpayService: RazorpayService, private productService:ProductService) {}
   

    

  // constructor(private route: ActivatedRoute) {}
  
  searchQuery:String =''
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['term'];
      this.getProducts()
      // window.location.reload();
      // Use this.searchTerm to fetch and display search results
    });
    console.log("1 ",this.searchQuery)

    
    
    
  }
getProducts(){
  this.productService.getAllProducts().subscribe(
    (data) => {
      
      this.products =data
      console.log("2 ",this.products)
      this.check()
    },
    (error) => {
      console.log(error)
    }
  )
 
 
}
  isProduct:Boolean=false
  check(){
    if (this.searchQuery.trim() === '') {
      // If the search query is empty, show all products
      this.dataArray=this.products
    } else {
      // Filter products based on the search query
      this.dataArray = this.products.filter(product =>
        product.productName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.productDesc.toLowerCase().includes(this.searchQuery.toLowerCase())||
        product.location.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.productCategory.toLowerCase().includes(this.searchQuery.toLowerCase()) 
      );
    }
    if(this.dataArray.length==0){
      this.isProduct=true
    }
    for(let i=0;i<this.dataArray.length;i++){
      this.dataArray[i].productImg ="data:image/jpeg;base64,"+this.dataArray[i].productImg;
    }
    console.log("dataarray : ", this.dataArray)
  }

  pay(amount:number,productId:string){
    this.razorpayService.createTransactionAndPlaceOrder(amount,productId)
  }
  
  }



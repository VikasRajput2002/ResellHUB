import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { RazorpayService } from '..//payment/razorpay.service';
import { UserService } from '../login/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../login/User.model';
import { ProductService } from '../add-product/product.service';
import { Product } from '../add-product/product.model';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  senderId : string=''; 
  senderName: string = '';
  recipientId: string = '';
  recipientName: string = ''; 
  messageContent = '';
  productId : string ='';
  amount : number = 0;
  chatMessages: any[] = [];
  usersWhoSent: { userId: string; name: string; }[] = [];
  productdetails:any;




  constructor(private chatService: ChatService,
     private razorpayService: RazorpayService,
     private userService: UserService,
     private productService: ProductService,
     
     private route: ActivatedRoute) {
      
     }

  ngOnInit(): void {

      
      this.route.queryParams.subscribe(params => {
        this.recipientId = params['userId'] || '';
        this.recipientName = params['name'] || '';
        this.productId = params['id'] || '';
        this.amount = params['productPrice'] || '';
        console.log(this.productId,this.amount)
        this.loadChatMessages();
        this.loadProductDetails(this.productId);
      });

    const userId = localStorage.getItem('userId');
  if (userId !== null) {
    this.senderId = userId;
  }
  this.senderName = localStorage.getItem('name') || '';

  this.loadProductDetails(this.productId); 

    this.loadChatMessages();

  }

 
  
  pay(amount:number,productId:string){
    this.razorpayService.createTransactionAndPlaceOrder(amount,productId)
  }

  sendMessage() {
    if (this.messageContent.trim() === '') {
     
      return;
    }
    
  
    this.chatService.sendMessage(this.senderId, this.recipientId, this.messageContent, this.senderName,)
      .subscribe(
        (response) => {
          console.log('Message sent:', response);
          this.messageContent = '';
          this.loadChatMessages();
        },
        (error) => {
          console.error('Error sending message:', error)
          if (error.error && error.error.message) { 
          } else {
          
          }
        }
      );
  }


  changeRecipient(newRecipientId: string,newRecipientName:string) {
    this.recipientId = newRecipientId;
    this.recipientName = newRecipientName;
    this.loadChatMessages();
  }

  loadChatMessages() {
    this.chatService.getChatMessages(this.senderId, this.recipientId)
      .subscribe(
        (messages) => {
          this.chatMessages = messages;
           
          for (const message of this.chatMessages) {
            message.productDetails = this.productdetails;}
            console.log("hi",this.productdetails)
        },
        (error) => {
          console.error('Error loading chat messages:', error);
        }
      );

      this.chatService.getUsersWhoSentMessages(this.senderId).subscribe(
        (userIds) => {
          const usersWithDetails: { userId: string, name: string }[] = [];
      
          for (const userId of userIds) {
            this.userService.getUserById(userId).subscribe(
              (user: User) => {
                usersWithDetails.push({ userId, name: user.name });
      
                if (usersWithDetails.length === userIds.length) {
                  this.usersWhoSent = usersWithDetails;
                }
              },
              (error) => {
                console.error('Error fetching user details:', error);
              }
            );
          }
        },
        (error) => {
          console.error('Error fetching user list:', error);
        }
      );
      }


      loadProductDetails(productId: string) {
        this.productService.getProductById(productId).subscribe(
          (data)=>{
            this.productdetails=data;
            this.productdetails.productImg ="data:image/jpeg;base64,"+this.productdetails.productImg;
           
          },
          (error)=>{
            console.log(error)
          }
        );
      }
      
      }
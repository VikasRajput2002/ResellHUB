export interface Slot {
  id: string;
  productName: string;
  productCategory: string;
  productDesc: string;
  productImg: Uint8Array;
  productImgUrl: string; // Add a property for the image URL
  location: string;
  userId:string;
  name:string;
  productPrice: number;
  bookingDate: string; // Adjust the type if it's not a string
    startTime: string; // Adjust the type if it's not a string
    endTime: string;
}

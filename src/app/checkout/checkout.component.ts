import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
// import Swal from "sweetalert2";
import { CartapiService } from "../service/cartapi.service";


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  checkOut!: FormGroup
  constructor(private api:ApiService,private cartapi:CartapiService,private fb:FormBuilder){
    this.checkOut = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    address:['',[Validators.required]],
    postal:['',[Validators.required]],
  })
  }

  check(){
    if (this.checkOut.valid) {
      this.api.getcheckOut(this.checkOut.value).subscribe((a:any)=>{
        console.log(a);
        // Swal.fire({
        //   title: "Order is Submitted!",
        //   icon: "success"
        // });
        this.checkOut.reset();
          this.cartapi.removeallproduct();
      })
    }
    else{
      // Swal.fire({
      //   title: "Oops!",
      //   text: "Please fill in all required fields!",
      //   icon: "error",
      //   confirmButtonText: "Okay"
      // });
    }
  }

}

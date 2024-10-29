import { Component,OnInit } from '@angular/core';
import { CartapiService } from '../service/cartapi.service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  products:any[] = []
  allproduct:any
  constructor(private cartapi:CartapiService,private api:ApiService){
  }
  ngOnInit(): void {
    this.cartapi.getproduct().subscribe((data:any) =>{
      this.products = data;
      this.allproduct = this.cartapi.getTotal();

    })
  }
  removeproduct(pro:any){
    this.cartapi.removeproduct(pro)
  }
  removeallproduct(){
    this.cartapi.removeallproduct()
  }
}

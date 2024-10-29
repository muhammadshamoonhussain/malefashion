import { Component,OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { CartapiService } from '../service/cartapi.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
productlist:any;
constructor(private cartapi:CartapiService,private api:ApiService){}
ngOnInit(): void {
  this.api.productList().subscribe((a:any)=>{
    this.productlist = a;
    this.productlist.forEach((a:any)=>{
      Object.assign(a,{quantity:1,total:a.price})
    })
  })
}
addtocart(pro:any){
  this.cartapi.addtocart(pro)
}
}
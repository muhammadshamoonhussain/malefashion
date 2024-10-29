import { Component,OnInit } from '@angular/core';
import { CartapiService } from '../service/cartapi.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  totalCart:number = 0
constructor(private cartapi:CartapiService){}
ngOnInit(): void {
  this.cartapi.product.subscribe((a:any)=>{
    this.totalCart = a.length
  })  
}
ismenuOpen:boolean = true;

toggleMenu(){
  this.ismenuOpen =! this.ismenuOpen;
}
}

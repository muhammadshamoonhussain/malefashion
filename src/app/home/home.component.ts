import { Component,AfterViewInit,ElementRef,ViewChild,OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { CartapiService } from '../service/cartapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',

})
export class HomeComponent implements AfterViewInit, OnInit{
  productList:any[] = [];
  @ViewChild('tshirt',{static:false}) tshirt !: ElementRef;

  ngAfterViewInit(): void {
  window.addEventListener('scroll', this.onScroll.bind(this));
}
private onScroll():void{
  const value = window.scrollY;
  if (this.tshirt) {
    this.tshirt.nativeElement.style.marginTop = value * -7.5 + 'px'
  }
  
}
count:number = 0
countStop:any = setInterval(() => {
  this.count += 20
  if (this.count >= 10000) {
    clearInterval(this.countStop)
  }
}, 10);
count1:number = 0
countStop1:any = setInterval(() => {
  this.count1 += 20
  if (this.count1 >= 50000) {
    clearInterval(this.countStop1)
  }
}, 10);

constructor(private api:ApiService, private cartapi:CartapiService){}
ngOnInit(): void {
   this.api.productList().subscribe((result: any) =>{
     this.productList = result;
     this.productList.forEach((a:any) => {
      Object.assign(a,{quantity:1, total:a.price})
     });
     console.log(result);    
   })
}
addtocart(item:any){
   this.cartapi.addtocart(item);
}
}

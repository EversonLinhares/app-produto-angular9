import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import {MatDialog} from '@angular/material/dialog';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {
  
  products: Product[];
  displayedColumns = ['id', 'name', 'price' , 'action'];
  private produtoExcluidoSubscription: Subscription;
  
  constructor(private service: ProductService,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {
   this.getProdutos();
   this.produtoExcluidoSubscription = this.service.produtoExcluido$.subscribe(id => {
    this.getProdutos();
  });
  }

  getProdutos() {
    this.service.read()
    .subscribe(products => {
      this.products = products
    })
  }

  openDialog(product: Product): void {
    this.dialog.open(ProductDeleteComponent, {
      width: '30vw',
      data: {product}
    });
  }

}

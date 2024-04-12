import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ProductService
  
  ) { }

  ngOnInit(): void {
    
  }

  deleteById(id: number): void {
    this.service.deleteById(id).subscribe(() => {
    this.service.showMessage("Produto excluido com sucesso!");
    this.service.notificarExclusaoProduto(id);
    })
  }

}

import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';


@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService
    .readById(parseInt(id))
    .subscribe(product => {
      this.product = product;
    })
  }

  updateProduct(): void {
    this.productService
    .update(this.product, this.product.id)
    .subscribe(() => {
      this.productService.showMessage("Produto atualizado com sucesso");
      this.router.navigate(["products"]);
    })
  }

  cancelProduct(): void {
    this.router.navigate(["/products"]);
  }

  deleteById(id: number): void {
    this.deleteById(id);
    this.productService.showMessage("Produto atualizado com sucesso");
    this.router.navigate(["products"]);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from './product.model';
import { environment } from 'src/environments/environment';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = environment.urlBase;
  private produtoExcluidoSource = new Subject<number>();
  produtoExcluido$ = this.produtoExcluidoSource.asObservable();

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError? ['msg-error'] : ['msg-success']
    })
  }


  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product)
    .pipe(
      map((obj) => obj),
      catchError(e => this.handleError(e))
    );
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
    .pipe(
      map((obj) => obj),
      catchError(e => this.handleError(e))
    );
  }

  readById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`)
    .pipe(
      map((obj) => obj),
      catchError(e => this.handleError(e))
    );
  }

  update(product: Product, id: number): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${product.id}`, product,)
    .pipe(
      map((obj) => obj),
      catchError(e => this.handleError(e))
    );
  }

  deleteById(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}/${id}`)
    .pipe(
      map((obj) => obj),
      catchError(e => this.handleError(e))
    );
  }

  notificarExclusaoProduto(id: number): void {
    this.produtoExcluidoSource.next(id);
  }

  handleError(e: any): Observable<any> {
    this.showMessage(e.message, true);
    return EMPTY;
  }

}

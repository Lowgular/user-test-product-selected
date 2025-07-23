import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface ProductModel {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly image: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>('products.json');
  }

  getById(id: number): Observable<ProductModel | undefined> {
    return this.http
      .get<ProductModel[]>('products.json')
      .pipe(map((products) => products.find((product) => product.id === id)));
  }
}

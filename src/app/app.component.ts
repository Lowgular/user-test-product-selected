import { Component } from '@angular/core';
import { ProductDetailComponent } from './products/product-detail.component';
import { ProductListComponent } from './products/product-list.component';

@Component({
    selector: 'app-root',
    template: ` <div class="container py-4 d-flex flex-column vh-100">
    <app-product-list class="row"></app-product-list>
    <app-product-detail class="row flex-grow-1"></app-product-detail>
  </div>`,
    imports: [ProductListComponent, ProductDetailComponent]
})
export class AppComponent {}

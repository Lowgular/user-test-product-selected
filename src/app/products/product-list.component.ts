import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductsService } from './products.service';

@Component({
    selector: 'app-product-list',
    template: `
    @for (product of products(); track product.id) {
    <div class="col-md-4">
      <div class="card">
        <div class="card-body">
          <img [src]="product.image" [alt]="product.name" class="img-fluid" />
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text fw-bold text-primary">
            {{ product.price | currency }}
          </p>
          <button class="btn btn-primary">Show more</button>
        </div>
      </div>
    </div>
    }
  `,
    imports: [CommonModule],
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  private readonly productsService = inject(ProductsService);
  protected readonly products = toSignal(this.productsService.getAll(), {
    initialValue: [],
  });
}

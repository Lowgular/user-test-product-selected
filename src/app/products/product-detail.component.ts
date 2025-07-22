import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ProductModel } from './products.service';

@Component({
    selector: 'app-product-detail',
    imports: [CommonModule],
    styleUrls: ['./product-detail.component.css'],
    template: `
    <div class="product-detail-container rounded">
      <div class="product-detail-card">
        @if (product(); as product) {
          <div
            class="product-image-wrapper"
            [ngStyle]="{ 'background-color': selectedColor() }"
            >
            <img
              [src]="product.image"
              [alt]="product.name"
              class="product-image"
              />
          </div>
          <div class="product-info">
            <h2 class="product-title">{{ product.name }}</h2>
            <p class="product-price text-primary">
              {{ product.price | currency }}
            </p>
            <p class="product-description">
              {{ product.description }}
            </p>
            <div class="color-picker">
              @for (color of colors; track color) {
                <span
                  class="color-circle"
                  [ngStyle]="{ 'background-color': color }"
                  [class.selected]="color === selectedColor()"
                  (click)="selectColor(color)"
                ></span>
              }
            </div>
          </div>
        } @else {
          <div class="product-image-wrapper">
            <img
              src="https://dummyimage.com/150x150/cccccc/888888&text=N/A"
              alt="No product selected"
              class="product-image"
              />
          </div>
          <div class="product-info">
            <h2 class="product-title">No product selected</h2>
            <p class="product-description">
              Choose a product from the list to view its details
            </p>
          </div>
        }
      </div>
    </div>
    `
})
export class ProductDetailComponent {
  product = signal<ProductModel | undefined>(undefined);

  protected readonly colors = ['#e5e7eb', '#fbbf24', '#60a5fa', '#a7f3d0'];
  protected readonly selectedColor = signal(this.colors[0]);

  protected selectColor(color: string) {
    this.selectedColor.set(color);
  }
}

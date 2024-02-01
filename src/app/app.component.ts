import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { OrderService } from './order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [NgFor],
  standalone: true
})
export class AppComponent implements OnInit {
  title = 'SubliminatorFrontEnd';
  orders: any[] = [];
  orderElements: SafeHtml;
  currentPage = 1;
  itemsPerPage = 10;
  searchTerm: string = '';

  constructor(private orderService: OrderService, private sanitizer: DomSanitizer) {
    this.orderElements = '';
  }

  ngOnInit() {
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data;
      const html = this.orders.map(order => 
        `<tr>
          <td>${order.id}</td>
          <td>${order.customer}</td>
          <td>${order.status}</td>
          <td>${order.address1}</td>
          <td>${order.amount}</td>
          <td>${order.city}</td>
          <td>${order.country}</td>
          <td>${order.date}</td>
          <td>${order.deleted}</td>
          <td>${order.lastModified}</td>
          <td>${order.postcode}</td>
          <td><button (click)="cancelOrder(order.id)">Cancelar</button></td>
        </tr>`
      ).join('');
      this.orderElements = this.sanitizer.bypassSecurityTrustHtml(html);
    });
  }

  updateOrderElements(): void {
    const html = this.orders.map(order => 
      `<tr>
        <td>${order.id}</td>
        <td>${order.customer}</td>
        <td>${order.status}</td>
        <td>${order.address1}</td>
        <td>${order.amount}</td>
        <td>${order.city}</td>
        <td>${order.country}</td>
        <td>${order.date}</td>
        <td>${order.deleted}</td>
        <td>${order.lastModified}</td>
        <td>${order.postcode}</td>
        <td><button (click)="cancelOrder(order.id)">Cancelar</button></td>
      </tr>`
    ).join('');
    this.orderElements = this.sanitizer.bypassSecurityTrustHtml(html);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.search(this.searchTerm);
    }
  }
  
  nextPage(): void {
    this.currentPage++;
    this.search(this.searchTerm);
  }

  search(searchTerm: string): void {
    this.orderService.searchOrders(searchTerm, this.currentPage, this.itemsPerPage).subscribe((data) => {
      this.orders = data;
      this.updateOrderElements();
    });
  }

  cancelOrder(orderId: string): void {
    this.orderService.cancelOrder(orderId).subscribe(() => {
      this.search(this.searchTerm);
    });
  }
}
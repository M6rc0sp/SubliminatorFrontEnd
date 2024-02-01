// src/app/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orders`);
  }

  searchOrders(searchTerm: string, page: number, itemsPerPage: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders?term=${searchTerm}&page=${page}&itemsPerPage=${itemsPerPage}`);
  }

  cancelOrder(orderId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/orders/${orderId}/cancel`, {});
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  apiurl: string = 'http://localhost:8085';
  constructor(private httpclient: HttpClient) {}

  getCustomers(): Observable<Array<Customer>> {
    return this.httpclient.get<Array<Customer>>(this.apiurl + '/customers');
  }

  searchCustomers(keyword: string): Observable<Array<Customer>> {
    console.log('service' + keyword);
    console.log(this.apiurl + '/customers/search?keyword=' + keyword);
    return this.httpclient.get<Array<Customer>>(
      this.apiurl + '/customers/search?keyword=' + keyword,
    );
  }

  ajoutercustomer(customer: Customer): Observable<Customer> {
    return this.httpclient.post<Customer>(this.apiurl + '/customers', customer);
  }

  deleteCustomer(id:number){
    return this.httpclient.delete(this.apiurl + '/customers/delete/'+id);
  }
}

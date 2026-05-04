import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomersService } from '../services/customers-service';
import { Customer } from '../model/customer.model';
import { required } from '@angular/forms/signals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-customer',
  imports: [ReactiveFormsModule],
  templateUrl: './new-customer.html',
  styleUrl: './new-customer.css',
})
export class NewCustomer {
  formNewCustomer!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private customerService: CustomersService,
    private router:Router) {}//!!!! Cette route pour naviger vers une autre route par exemple apres ajout du Coustmer

  ngOnInit() {
    this.formNewCustomer = this.fb.group({
      name: this.fb.control(null, [Validators.required,Validators.minLength(4)]),
      email: this.fb.control(null, [Validators.email,Validators.required]),
    });
  }

  protected handeleNewCustomer() {
    let customer: Customer = this.formNewCustomer?.value;
    this.customerService.ajoutercustomer(customer).subscribe({
      next: (data) => {
        alert('Customer Saved ');
        //vider le formuliare
        //this.formNewCustomer.reset();
        //naviger vers une autre page
        this.router.navigateByUrl("/admin/customers");
      },
      error: (err) => {
        console.log('Customer Not Saved ');
      },
    });
  }

  protected readonly required = required;
}

import { Component } from '@angular/core';
import { CustomersService } from '../services/customers-service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { getDevserverKey } from '@angular/cli/src/commands/mcp/devserver';

@Component({
  selector: 'app-customers',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers {
  customers!: Array<Customer>;
  errorMessage!: string;
  formGroupCustomers!: FormGroup;


  constructor(
    private customerService: CustomersService,
    private fb: FormBuilder,
  ) {}

  gettCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (err) => {
        this.errorMessage = err.message;
      },
    });
  }

  ngOnInit() {
    this.gettCustomers();

    this.formGroupCustomers = this.fb.group(
      //que contient la formulaire
      { keyword: this.fb.control('') },
    );

  }

   handeleSearchCustomers() {

    let Keyword =this.formGroupCustomers?.value.keyword;//?=cad si la formulaire a une value faire .value
     console.log(Keyword)
     this.customerService.searchCustomers(Keyword).subscribe(
             {
               next:(data)=>{this.customers=data },
               error:(err)=>{this.errorMessage=err.message}
             }
           )
  }

  protected handleDelete(id: number) {
    let conf = confirm("Are you sure ?");
    if(!conf) return;
      this.customerService.deleteCustomer(id).subscribe({
        next: (data) => {
          alert('Customer Deleted');
          this.customers = this.customers.filter((c) => c.id !== id);

        },
        error:err => {console.log(err)}
      });

  }
}

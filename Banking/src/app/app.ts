import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Authentification } from './services/authentification';
//import { Navbar } from './navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('Banking');

  constructor(private authserviec: Authentification) {}
  ngOnInit() {
    this.authserviec.loadJWTokenFromlocalStorage()
  }
}

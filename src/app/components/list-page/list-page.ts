import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {HeaderComponent} from '../atoms/header';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-page',
  imports: [
    MatButton,
    HeaderComponent
  ],
  templateUrl: './list-page.html',
  styleUrl: './list-page.css',
})

export class ListPage {
  private router = inject(Router);

  items = [
    { name: 'BitCoin' },
    { name: 'Ethereum' },
    { name: 'DogeCoin' },
  ];
  list_items = [
    { name: 'BitCoin', price: 30000, change: '+5%' },
    { name: 'Ethereum', price: 1000, change: '+3%' },
    { name: 'DogeCoin', price: 1000, change: '+4%' },
    { name: 'LiteCoin', price: 150, change: '-2%' },
    { name: 'Ripple', price: 0.5, change: '+1%' },
    { name: 'Cardano', price: 0.3, change: '+0.5%' },
  ];
  // showInfo(item: any) {
  //   alert(`Link: ${item.name}\nRoute: ${item.route}`);
  // }

  goToDetails(item_name: string) {
    this.router.navigate(['details', item_name]);
  }
}

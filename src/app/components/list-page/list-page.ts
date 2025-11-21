import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {HeaderComponent} from '../atoms/header';
import {Router} from '@angular/router';
import {CryptocurrencyService} from '../../services/cryptocurrency.service';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-list-page',
  imports: [
    MatButton,
    HeaderComponent,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './list-page.html',
  styleUrl: './list-page.css',
})

export class ListPage implements OnInit {
  private router = inject(Router);
  private cryptoService = inject(CryptocurrencyService)

  list_items: any[] = [];
  items: any[] = [];

  // showInfo(item: any) {
  //   alert(`Link: ${item.name}\nRoute: ${item.route}`);
  // }

  ngOnInit() {
    this.loadCryptocurrencies();
  }

  loadCryptocurrencies(): void {
    // Update your service call to include page and size parameters
    this.cryptoService.getTop10Cryptocurrencies().subscribe(
      (cryptocurrencies) => {
        this.list_items = cryptocurrencies;
        this.list_items.sort((a, b) => b.price - a.price);
        this.items = [this.list_items[0], this.list_items[1], this.list_items[2]];
    });
  }

  goToDetails(item_name: string) {
    this.router.navigate(['details', item_name]);
  }
}

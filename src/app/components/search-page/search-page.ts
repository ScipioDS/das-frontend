import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {HeaderComponent} from '../atoms/header';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-search-page',
  imports: [
    MatButton,
    HeaderComponent
  ],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
})
export class SearchPage implements OnInit, OnDestroy {
  private router = inject(Router);
  query: string | null = null;
  private queryParamsSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParamMap.subscribe((params) => {
      this.query = params.get('q');
    });
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription?.unsubscribe();
  }

  list_items = [
    { name: 'BitCoin', price: 30000, change: '+5%' },
    { name: 'Ethereum', price: 1000, change: '+3%' },
    { name: 'DogeCoin', price: 1000, change: '+4%' },
    { name: 'LiteCoin', price: 150, change: '-2%' },
    { name: 'Ripple', price: 0.5, change: '+1%' },
    { name: 'Cardano', price: 0.3, change: '+0.5%' },
  ];

  goToDetails(item_name: string) {
    this.router.navigate(['details', item_name]);
  }
}

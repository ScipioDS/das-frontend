import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {HeaderComponent} from '../atoms/header';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CryptocurrencyService} from '../../services/cryptocurrency.service';
import {CryptoPage} from '../../models/interfaces/page-response';
import {CryptoFilter} from '../../models/filter/CryptoFilter';

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
  private cryptoService = inject(CryptocurrencyService);
  list_items: any = [];
  query: string | null = null;
  private queryParamsSubscription: Subscription | undefined;

  // Pagination properties
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  totalElements: number = 0;
  isFirstPage: boolean = true;
  isLastPage: boolean = false;
  filter: CryptoFilter = {ticker: null, name: null};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParamMap.subscribe((params) => {
      this.query = params.get('q');
      this.filter = {
        ticker: this.query,
        name: this.query
      };
      this.loadCryptocurrencies();
    });
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription?.unsubscribe();
  }

  loadCryptocurrencies(): void {
    // Update your service call to include page and size parameters
    this.cryptoService.getAllCryptocurrencyPaged(this.currentPage, this.pageSize, this.filter).subscribe(
      (response: any) => {
        this.list_items = response.content;
        this.currentPage = response.number;
        this.pageSize = response.size;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.isFirstPage = response.first;
        this.isLastPage = response.last;
      }
    );
  }

  goToDetails(item_name: string): void {
    this.router.navigate(['details', item_name]);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadCryptocurrencies();
  }

  nextPage(): void {
    if (!this.isLastPage) {
      this.currentPage++;
      this.loadCryptocurrencies();
    }
  }

  previousPage(): void {
    if (!this.isFirstPage) {
      this.currentPage--;
      this.loadCryptocurrencies();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(0, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages - 1, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }
}

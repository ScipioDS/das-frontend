import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeaderComponent} from '../atoms/header';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {CryptocurrencyService} from '../../services/cryptocurrency.service';

@Component({
  selector: 'app-profile-page',
  imports: [
    HeaderComponent
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);
  cryptoService = inject(CryptocurrencyService)
  id: number | null = null;

  user: User | null = null;
  list_items: any = null;

  ngOnInit() {
    this.id = Number.parseInt(<string>this.activatedRoute.snapshot.paramMap.get('id'),10);
    this.userService.getUserById(this.id).subscribe(user => {
      this.user = {
        email: user.email,
        id: user.id,
        fullName: user.fullName,
        role: user.role,
        authorities: user.authorities,
      }
    })

    this.cryptoService.getSavedCrypto().subscribe(cryptocurrency => {
      this.list_items = cryptocurrency;
    })
  }
}

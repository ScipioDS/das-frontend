import { Routes } from '@angular/router';
import {LandingPage} from './components/landing-page/landing-page';
import {ListPage} from './components/list-page/list-page';
import {DetailsPage} from './components/details-page/details-page';
import {LoginPage} from './components/login-page/login-page';
import {ProfilePage} from './components/profile-page/profile-page';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
    title: 'PreKnow - Welcome'
  },
  {
    path: 'explore',
    component: ListPage,
    title: 'PreKnow - Explore'
  },
  {
    path: 'details/:name',
    component: DetailsPage,
    title: 'PreKnow - Details'
  },
  {
    path: 'search',
    loadComponent: () => import('./components/search-page/search-page').then(m => m.SearchPage),
    title: 'PreKnow - Search Results'
  },
  {
    path: 'login',
    component: LoginPage,
    title: 'PreKnow - Details'
  },
  {
    path: 'register',
    component: LoginPage,
    title: 'PreKnow - Details'
  },
  {
    path: 'profile/:id',
    component: ProfilePage,
    title: 'PreKnow - Profile'
  },
  {
    path: '**',
    component: LandingPage,
    title: 'PreKnow - Welcome'
  }
];

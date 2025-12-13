import { Routes } from '@angular/router';
import {LandingPage} from './components/landing-page/landing-page';
import {ListPage} from './components/list-page/list-page';
import {DetailsPage} from './components/details-page/details-page';
import {LoginPage} from './components/login-page/login-page';
import {ProfilePage} from './components/profile-page/profile-page';
// import {AdminPage} from './components/admin/admin-page/admin-page';
import {adminGuard} from './services/admin.guard';

const titleBase = 'PreKnow - ';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
    title: titleBase + 'Welcome'
  },
  {
    path: 'explore',
    component: ListPage,
    title: titleBase + 'Explore'
  },
  {
    path: 'details/:name',
    component: DetailsPage,
    title: titleBase + 'Details'
  },
  {
    path: 'search',
    loadComponent: () => import('./components/search-page/search-page').then(m => m.SearchPage),
    title: titleBase + 'Search Results'
  },
  {
    path: 'login',
    component: LoginPage,
    title: titleBase + 'Details'
  },
  {
    path: 'register',
    component: LoginPage,
    title: titleBase + 'Details'
  },
  {
    path: 'profile/:id',
    component: ProfilePage,
    title: titleBase + 'Profile'
  },
  // {
  //   path: 'admin',
  //   component: AdminPage,
  //   canActivate: [adminGuard],
  //   title: titleBase + 'Admin'
  // },
  {
    path: '**',
    component: LandingPage,
    title: titleBase + 'Welcome'
  }
];

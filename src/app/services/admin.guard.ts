// src/app/guards/admin.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { map, take } from 'rxjs/operators';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.getCurrentUser().pipe(
    take(1),
    map(user => {
      if (!user) {
        router.navigate(['/login'], {
          queryParams: { returnUrl: state.url }
        });
        return false;
      }

      // Check using authorities array (most reliable)
      const isAdmin = user.authorities?.some(auth =>
        auth.authority === 'ROLE_ADMIN'
      ) ?? false;

      // Alternative: Check using role object
      // const isAdmin = user.role?.name === 'ADMIN';

      if (!isAdmin) {
        router.navigate(['/']);
        return false;
      }

      return true;
    })
  );
};

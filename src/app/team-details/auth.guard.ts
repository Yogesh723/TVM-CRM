import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (sessionStorage.getItem('isLogin') == 'Valid') {
    sessionStorage.clear();
    return true;
  }
  const router = new Router();
  router.navigateByUrl('/');
  return false;
};

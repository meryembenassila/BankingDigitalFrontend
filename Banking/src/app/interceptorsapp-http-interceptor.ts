import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorsappHttpInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

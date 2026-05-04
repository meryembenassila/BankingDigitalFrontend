import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Authentification } from '../services/authentification';


//!!!pour que l'intercepteur fonctionne cad tous les requetes passe par lui il faut le declarrer dans app.config.ts ==>voir

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Authentification); //on a injecter le service auth prendre jwt pour les ajouter dans les requetes

  const token = authService.accessToken; //le jwt

  console.log(' ****** ');
  console.log(req.url);

  // on doit pas ajouter le tocken dans l'url de login car c'est elle qui donne jwt
  if (!req.url.includes('/auth/login')) {
    const token = authService.accessToken;//tocken de service qui nous la donner apres login

    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(clonedReq);
  }

  //  requête login sans token
  return next(req);
};

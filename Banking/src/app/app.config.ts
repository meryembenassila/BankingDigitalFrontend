import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appHttpInterceptor } from './interceptors/app-http-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([appHttpInterceptor]), //pour utilser l'intercepteur(il faut le mettre en dedant de clienthttp)
    ), //pour utilser le client http dans n'importe quelle service il faut faire @injection des
  ],
};

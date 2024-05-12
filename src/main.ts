import { enableProdMode, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthService } from './app/shared/api/auth/auth.api.service';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { providerHttpInterceptor } from './app/core/interceptors/http-interceptor.service';
import { environment } from './environments/environment';
import { AlbumApi } from './app/album/services/api/album.api';
import { AlbumApiService } from './app/album/services/api/album.api.service';
import { spotifyReducer } from './app/core';
import { Navigation, NavigationService } from './app/shared';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
    providerHttpInterceptor(),
    AuthService,
    provideStore({ spotify: spotifyReducer }),
    { provide: AlbumApi, useClass: AlbumApiService },
    { provide: Navigation, useClass: NavigationService },
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
  ],
});

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialcoreModule } from './materialcore/materialcore.module';
import { ApiAuthorizationModule } from './authorization/api-authorization.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NavsideComponent } from './navside/navside.component';
import { GreetingComponent } from './greeting/greeting.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthorizeInterceptor } from './authorization/authorize.interceptor';

@NgModule({
  declarations: [
    AppComponent, 

    NavbarComponent,
    NavsideComponent,
    GreetingComponent
  ],
  imports: [
    BrowserModule,
    
    BrowserAnimationsModule,
    ApiAuthorizationModule,
    MaterialcoreModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule, 
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the app is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizeInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

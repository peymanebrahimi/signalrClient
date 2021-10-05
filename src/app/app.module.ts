import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialJalaliMomentAdapterModule } from 'material-jalali-moment-adapter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiAuthorizationModule } from './authorization/api-authorization.module';
import { AuthorizeInterceptor } from './authorization/authorize.interceptor';
import { GreetingComponent } from './greeting/greeting.component';
import { MaterialcoreModule } from './materialcore/materialcore.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NavsideComponent } from './navside/navside.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent, 

    NavbarComponent,
    NavsideComponent,
    GreetingComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    ApiAuthorizationModule,
    MaterialcoreModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialJalaliMomentAdapterModule,
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

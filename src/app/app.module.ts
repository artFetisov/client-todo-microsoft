import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {en_US} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CategoriesModule} from "./modules/categories/categories.module";
import {CoreModule} from "./core/core.module";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzGridModule} from "ng-zorro-antd/grid";
import localeRu from '@angular/common/locales/ru';
import {LoginComponent} from './components/login/login/login.component';
import {MainComponent} from './components/main/main/main.component';
import {AuthInterceptor} from "./shared/interceptors/auth.interceptor";
import {WelcomeComponent} from './components/welcome/welcome/welcome.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzInputModule} from "ng-zorro-antd/input";
import {RegistrationComponent} from './components/registration/registration.component';
import {NzSpinModule} from "ng-zorro-antd/spin";

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    WelcomeComponent,
    RegistrationComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CategoriesModule,
    CoreModule,
    NzLayoutModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    NzSpinModule
  ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

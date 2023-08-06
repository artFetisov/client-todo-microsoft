import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login/login.component";
import {MainComponent} from "./components/main/main/main.component";
import {WelcomeComponent} from "./components/welcome/welcome/welcome.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {loginGuard} from "./shared/guards/login.guard";
import {logoutGuard} from "./shared/guards/logout.guard";

const routes: Routes = [
    {path: '', component: WelcomeComponent, title: 'Добро пожаловать'},
    // {path: 'todo', component: MainComponent, title: 'Todo', canActivate: [loginGuard]},
    // {path: 'login', component: LoginComponent, title: 'Войдите', canActivate: [logoutGuard]},
    // {path: 'registration', component: RegistrationComponent, title: 'Зарегистрируйтесь', canActivate: [logoutGuard]},
    {path: 'todo', component: MainComponent, title: 'Todo'},
    {path: 'login', component: LoginComponent, title: 'Войдите'},
    {path: 'registration', component: RegistrationComponent, title: 'Зарегистрируйтесь'},
    {path: '**', redirectTo: ''}
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

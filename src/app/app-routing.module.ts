import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardserviceGuard } from '../app/shared/guards/guardservice.guard';
import { NologinGuard } from '../app/shared/guards/nologin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'app', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [GuardserviceGuard] },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule', canActivate: [GuardserviceGuard] },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule', canActivate: [NologinGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [NologinGuard] },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

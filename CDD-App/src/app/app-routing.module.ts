import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'create-profile',
    loadChildren: () => import('./create-profile/create-profile.module').then( m => m.CreateProfilePageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'rate',
    loadChildren: () => import('./rate/rate.module').then( m => m.RatePageModule)
  },
  {
    path: 'pass',
    loadChildren: () => import('./pass/pass.module').then( m => m.PassPageModule)
  },
  {
    path: 'not-pass',
    loadChildren: () => import('./not-pass/not-pass.module').then( m => m.NotPassPageModule)
  },
  {
    path: 'results',
    loadChildren: () => import('./results/results.module').then( m => m.ResultsPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'child-list',
    loadChildren: () => import('./child-list/child-list.module').then( m => m.ChildListPageModule)
  },  {
    path: 'rate-menu',
    loadChildren: () => import('./rate-menu/rate-menu.module').then( m => m.RateMenuPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

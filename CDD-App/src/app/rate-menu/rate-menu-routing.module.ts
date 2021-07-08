import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RateMenuPage } from './rate-menu.page';

const routes: Routes = [
  {
    path: '',
    component: RateMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RateMenuPageRoutingModule {}

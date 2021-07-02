import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotPassPage } from './not-pass.page';

const routes: Routes = [
  {
    path: '',
    component: NotPassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotPassPageRoutingModule {}

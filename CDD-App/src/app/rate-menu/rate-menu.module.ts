import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RateMenuPageRoutingModule } from './rate-menu-routing.module';

import { RateMenuPage } from './rate-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RateMenuPageRoutingModule
  ],
  declarations: [RateMenuPage]
})
export class RateMenuPageModule {}

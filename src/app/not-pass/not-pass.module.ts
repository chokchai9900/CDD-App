import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotPassPageRoutingModule } from './not-pass-routing.module';

import { NotPassPage } from './not-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotPassPageRoutingModule
  ],
  declarations: [NotPassPage]
})
export class NotPassPageModule {}

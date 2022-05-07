import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";
import {TabViewModule} from "primeng/tabview";
import {CheckboxModule} from "primeng/checkbox";
import {ProgressSpinnerModule} from "primeng/progressspinner";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    TabViewModule,
    CheckboxModule,
    ProgressSpinnerModule
  ]
})
export class PrimeModule { }

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoriesComponent} from './components/categories/categories.component';
import {SharedModule} from "../../shared/shared.module";
import {NzIconModule} from "ng-zorro-antd/icon";
import {FormsModule} from "@angular/forms";
import {CategoryComponent} from './components/categories/category/category.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryComponent
  ],
  exports: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NzIconModule,
    FormsModule
  ]
})
export class CategoriesModule {
}

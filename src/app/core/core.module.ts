import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './layout/header/header.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzGridModule} from "ng-zorro-antd/grid";
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {ContentComponent} from './layout/content/content.component';
import {CategoriesModule} from "../modules/categories/categories.module";
import {NzIconModule} from "ng-zorro-antd/icon";
import {TasksModule} from "../modules/tasks/tasks.module";
import {TaskDetailsBarComponent} from './layout/task-details-bar/task-details-bar.component';
import {EditTaskBarModule} from "../modules/edit-task-bar/edit-task-bar.module";
import {FormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    TaskDetailsBarComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    TaskDetailsBarComponent
  ],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzGridModule,
    CategoriesModule,
    NzIconModule,
    TasksModule,
    EditTaskBarModule,
    FormsModule,
    NzInputModule
  ]
})
export class CoreModule {
}

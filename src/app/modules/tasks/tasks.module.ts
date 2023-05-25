import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './components/tasks/tasks.component';
import {SharedModule} from "../../shared/shared.module";
import {NzGridModule} from "ng-zorro-antd/grid";
import { TaskComponent } from './components/tasks/task/task.component';
import {FormsModule} from "@angular/forms";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import { TopToolbarComponent } from './components/tasks/top-toolbar/top-toolbar.component';
import {NzWaveModule} from "ng-zorro-antd/core/wave";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzPopoverModule} from "ng-zorro-antd/popover";
import { AddTaskComponent } from './components/tasks/add-task/add-task.component';
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {RouterModule} from "@angular/router";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";



@NgModule({
  declarations: [
    TasksComponent,
    TaskComponent,
    TopToolbarComponent,
    AddTaskComponent
  ],
  exports: [
    TasksComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NzGridModule,
    FormsModule,
    NzCheckboxModule,
    NzModalModule,
    NzIconModule,
    NzToolTipModule,
    NzWaveModule,
    NzButtonModule,
    NzPopoverModule,
    NzCollapseModule,
    RouterModule,
    NzDropDownModule
  ]
})
export class TasksModule { }

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditTaskBarComponent} from './components/edit-task-bar/edit-task-bar.component';
import {FormsModule} from "@angular/forms";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzButtonModule} from "ng-zorro-antd/button";
import {EditDateComponent} from './components/edit-task-bar/edit-date/edit-date.component';
import {EditBarHeadComponent} from './components/edit-task-bar/edit-bar-head/edit-bar-head.component';
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzCalendarModule} from "ng-zorro-antd/calendar";
import {SharedModule} from "../../shared/shared.module";
import {EditBarFooterComponent} from './components/edit-task-bar/edit-bar-footer/edit-bar-footer.component';
import { AddStepFormComponent } from './components/edit-task-bar/add-step-form/add-step-form.component';
import { TaskStepComponent } from './components/edit-task-bar/add-step-form/task-step/task-step.component';
import { EditCategoryComponent } from './components/edit-task-bar/edit-category/edit-category.component';
import { EditColorCategoryComponent } from './components/edit-task-bar/edit-color-category/edit-color-category.component';
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";


@NgModule({
  declarations: [
    EditTaskBarComponent,
    EditDateComponent,
    EditBarHeadComponent,
    EditBarFooterComponent,
    AddStepFormComponent,
    TaskStepComponent,
    EditCategoryComponent,
    EditColorCategoryComponent
  ],
  exports: [
    EditTaskBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzCheckboxModule,
    NzInputModule,
    NzIconModule,
    NzToolTipModule,
    NzSelectModule,
    NzButtonModule,
    NzDatePickerModule,
    NzCalendarModule,
    SharedModule,
    NzMenuModule,
    NzDropDownModule
  ]
})
export class EditTaskBarModule {
}

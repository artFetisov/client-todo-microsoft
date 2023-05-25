import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskDatePipe} from "./pipes/task-date.pipe";
import {AutofocusDirective} from './directives/autofocus.directive';
import {HoverColorDirective} from './directives/hover.directive';

@NgModule({
  declarations: [TaskDatePipe, AutofocusDirective, HoverColorDirective],
  exports: [
    TaskDatePipe,
    AutofocusDirective,
    HoverColorDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}

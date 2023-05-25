import {Component, Input} from '@angular/core';
import {Step, Task} from "../../../../../../shared/data/model/task";
import {TasksService} from "../../../../../tasks/services/tasks.service";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-task-step',
  templateUrl: './task-step.component.html',
  styleUrls: ['./task-step.component.scss']
})
export class TaskStepComponent {
  @Input() step!: Step
  @Input() selectedTask!: Task

  isEditMode = false
  tmpTitle = ''

  constructor(private tasksService: TasksService, private modal: NzModalService) {
  }

  setIsEditMode(value: boolean) {
    if (!this.isEditMode) {
      this.tmpTitle = this.step.title
    }
    this.isEditMode = value
  }

  changeStepStatusHandler() {
    this.setIsEditMode(false)
    this.tasksService.updateStep({
      taskId: this.selectedTask.id,
      stepId: this.step.id,
      categoryId: this.selectedTask.categoryId,
      newDataObj: {completed: !this.step.completed}
    })
  }

  changeStepTitleHandler() {
    this.setIsEditMode(false)
    this.tasksService.updateStep({
      taskId: this.selectedTask.id,
      stepId: this.step.id,
      categoryId: this.selectedTask.categoryId,
      newDataObj: {title: this.tmpTitle}
    })
    this.tmpTitle = ''
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: `Элемент ${this.step.title} будет удален без возможности восстановления. Вы точно хотите это сделать?`,
      nzOkText: 'Да',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.tasksService.deleteStep({
        taskId: this.selectedTask.id,
        categoryId: this.selectedTask.categoryId,
        stepId: this.step.id
      }),
      nzCancelText: 'Нет',
    });
  }

  deleteStepHandler() {
    this.showDeleteConfirm()
  }
}

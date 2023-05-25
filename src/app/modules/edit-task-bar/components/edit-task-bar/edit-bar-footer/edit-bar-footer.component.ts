import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HtmlTemplateService} from "../../../../../shared/services/html-template.service";
import {Task} from "../../../../../shared/data/model/task";

@Component({
  selector: 'app-edit-bar-footer',
  templateUrl: './edit-bar-footer.component.html',
  styleUrls: ['./edit-bar-footer.component.scss']
})
export class EditBarFooterComponent {
  @Output() deleteTaskEvent = new EventEmitter()
  @Input() selectedTask!: Task

  constructor(private templateService: HtmlTemplateService) {
  }

  hideEditBarHandler() {
    this.templateService.toggleShowEditBar(false)
  }

  deleteTaskHandler() {
    this.deleteTaskEvent.emit()
  }
}

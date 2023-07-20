import {Component, OnDestroy, OnInit} from '@angular/core';
import {HtmlTemplateService} from "../../../shared/services/html-template.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-task-details-bar',
  templateUrl: './task-details-bar.component.html',
  styleUrls: ['./task-details-bar.component.scss']
})
export class TaskDetailsBarComponent implements OnInit, OnDestroy {
  isOpenEditBar!: boolean
  subscription!: Subscription

  constructor(private templateService: HtmlTemplateService) {
  }

  ngOnInit() {
    this.subscription = this.templateService.isOpenEditSideBar$.subscribe(val => {
      this.isOpenEditBar = val
    })
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe()
  }
}

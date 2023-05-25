import {Component, OnDestroy, OnInit} from '@angular/core';
import {HtmlTemplateService} from "../../../shared/services/html-template.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isShowLeftSideBar!: boolean
  subscription!: Subscription

  constructor(private templateService: HtmlTemplateService) {
  }

  ngOnInit() {
    this.subscription = this.templateService.isOpenLeftSideBar$.subscribe(val => this.isShowLeftSideBar = val)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  toggleShowLeftSideBarHandler() {
    this.templateService.toggleShowLeftSideBar()
  }
}

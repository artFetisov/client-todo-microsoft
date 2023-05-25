import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  Category,
  ThemeColor,
} from '../../../../../shared/data/model/category';
import {
  CurrentSort, SortDirection, SortParams, SortProperty,
} from '../../../../../shared/data/model/task';
import {HtmlTemplateService} from '../../../../../shared/services/html-template.service';
import {themeColors} from '../../../../../shared/data/data/themeColors';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss'],
})
export class TopToolbarComponent {
  @Input() selectedCategory!: Category;
  @Input() isOpenLeftSideBar!: boolean;
  @Input() activeThemeColor!: ThemeColor;
  @Output() changeCategoryTitleEvent = new EventEmitter<{
    title: string;
    catId: number;
  }>();
  @Output() deleteCategoryEvent = new EventEmitter<{ catId: number }>();
  @Output() filterByEvent = new EventEmitter<SortParams>();
  @Output() setThemeEvent = new EventEmitter<ThemeColor>();
  @Output() getTasksByCategoryEvent = new EventEmitter<Category>()

  isEditMode = false;
  tmpTitle!: string;
  changePopoverVisible = false;
  sortPopoverVisible = false;
  allThemeColors: ThemeColor[] = themeColors;
  currentSortFilter: CurrentSort = '';
  currentSortDirection: SortDirection = 'ASC'
  currentSortProperty: SortProperty = 'priority'

  constructor(
    private templateService: HtmlTemplateService,
    private modal: NzModalService
  ) {
  }

  setCurrentSort(sort: CurrentSort) {
    this.currentSortFilter = sort;
  }

  setActiveThemeHandler(theme: ThemeColor) {
    this.setThemeEvent.emit(theme);
  }

  toggleShowLeftSideBar() {
    this.templateService.toggleShowLeftSideBar();
  }

  clickChangePopover() {
    this.changePopoverVisible = false;
  }

  clickSortPopover() {
    this.sortPopoverVisible = false;
  }

  toggleEditMode() {
    if (!this.isEditMode) {
      this.tmpTitle = this.selectedCategory.title;
    }
    this.isEditMode = !this.isEditMode;
  }

  changeSortDirectionHandler() {
    this.currentSortDirection = this.currentSortDirection === 'DESC' ? 'ASC' : 'DESC'

    this.filterByEvent.emit({property: this.currentSortProperty, direction: this.currentSortDirection})
  }

  deleteCategoryHandler() {
    this.clickChangePopover();
    this.showDeleteConfirm();
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: `Вы действительно хотите удалить список ${this.selectedCategory.title}?`,
      nzOkText: 'Да',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.deleteCategoryEvent.emit({catId: this.selectedCategory.id}),
      nzCancelText: 'Нет',
    });
  }

  changeCategoryTitleHandler() {
    this.toggleEditMode();
    this.changeCategoryTitleEvent.emit({
      title: this.tmpTitle,
      catId: this.selectedCategory.id,
    });
  }

  sortByParamsHandler(sortData: SortParams) {
    this.currentSortProperty = sortData.property
    this.filterByEvent.emit({property: sortData.property, direction: sortData.direction})
  }

  clearSortParamsHandler() {
    this.currentSortFilter = ''
    this.getTasksByCategoryEvent.emit(this.selectedCategory)
  }
}

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TasksService} from '../../../modules/tasks/services/tasks.service';
import {debounceTime, distinctUntilChanged, fromEvent, map} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef | undefined

  tmpTitle!: string

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    fromEvent(this.searchInput?.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value
      }),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(_ => {
      this.tasksService.searchByTitle(this.tmpTitle)
    })
  }
}

import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'taskDate'
})
export class TaskDatePipe extends DatePipe implements PipeTransform {

  // @ts-ignore
  override transform(date: string | number | Date | null, format?: string, timezone?: string, locale?: string): string | null {

    if (date === null) {
      return null
    }

    date = new Date(date);

    const currentDate = new Date().getDate();

    const currentMonth = new Date().getMonth()

    const currentYear = new Date().getFullYear()

    if (date.getDate() === currentDate && date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
      return 'Сегодня'
    }

    if (date.getDate() === currentDate - 1 && date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
      return 'Вчера'
    }

    if (date.getDate() === currentDate + 1 && date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
      return 'Завтра'
    }

    return new DatePipe('ru-RU').transform(date, format)
  }

  private checkDateEqual() {

  }

}

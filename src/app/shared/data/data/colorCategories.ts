import {CircleBackgroundColors, CircleBorderColors, ColorCategory} from "../model/task";

export const colorCategories: ColorCategory[] = [
  {id: 1, title: 'Желтая категория', color: CircleBackgroundColors.YELLOW, border: CircleBorderColors.YELLOW},
  {id: 2, title: 'Оранжевая категория', color: CircleBackgroundColors.ORANGE, border: CircleBorderColors.ORANGE},
  {id: 3, title: 'Красная категория', color: CircleBackgroundColors.RED, border: CircleBorderColors.RED},
  {id: 4, title: 'Лиловая категория', color: CircleBackgroundColors.PURPLE, border: CircleBorderColors.PURPLE},
  {id: 5, title: 'Синяя категория', color: CircleBackgroundColors.BLUE, border: CircleBorderColors.BLUE},
  {id: 6, title: 'Зеленая категория', color: CircleBackgroundColors.GREEN, border: CircleBorderColors.GREEN},
]

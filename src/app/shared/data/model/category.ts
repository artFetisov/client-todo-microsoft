export interface Category {
  id: number
  title: string
  createdAt: Date
  updatedAt: Date
}

export enum ThemeColors {
  RED = '#D2534E',
  BLUE = '#2564CF',
  PURPLE = '#7A45BF',
  GREEN = '#2CA52D',
  LIGHT_BLUE = '#228BE8',
}

export type ColorVariant =
  | ThemeColors.GREEN
  | ThemeColors.RED
  | ThemeColors.BLUE
  | ThemeColors.LIGHT_BLUE
  | ThemeColors.PURPLE;

export interface ThemeColor {
  id: string;
  title: string;
  color: ColorVariant;
}

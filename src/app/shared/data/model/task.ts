import {Category} from "./category";

export interface Step {
  id: number
  title: string
  taskId: number
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export interface DomainTask {
  id: number
  title: string
  priority: boolean
  categoryId: number
  completionDate: Date | null
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export interface DomainTaskWithAllFields extends DomainTask {
  steps: Step[]
  category: Category
}

export interface Task extends DomainTaskWithAllFields {
  colorCategory: ColorCategory[]
}

export interface Tasks {
  [key: number]: Task[]
}

export interface ColorCategory {
  id: number
  title: string
  color: CircleBackgroundColor
  border: CircleBorderColor
}

export type CircleBackgroundColor =
  CircleBackgroundColors.BLUE
  | CircleBackgroundColors.RED
  | CircleBackgroundColors.GREEN
  | CircleBackgroundColors.ORANGE
  | CircleBackgroundColors.YELLOW
  | CircleBackgroundColors.PURPLE

export type CircleBorderColor =
  CircleBorderColors.GREEN
  | CircleBorderColors.RED
  | CircleBorderColors.PURPLE
  | CircleBorderColors.BLUE
  | CircleBorderColors.YELLOW
  | CircleBorderColors.ORANGE

export enum CircleBackgroundColors {
  YELLOW = '#FFFDE0',
  ORANGE = '#FFF1E0',
  RED = '#FCE9EA',
  PURPLE = '#F0ECF6',
  BLUE = '#E0F7FD',
  GREEN = '#E9F9E8'
}

export enum CircleBorderColors {
  ORANGE = '#A35A00',
  YELLOW = '#7A7400',
  RED = '#D01B2A',
  PURPLE = '#7D57B2',
  BLUE = '#007899',
  GREEN = '#257E20'
}

export type PriorityVariant = 'high' | 'low'

export interface UpdateTaskData {
  taskId: number
  categoryId: number
  newDataObj: {
    completed?: boolean
    title?: string
    categoryId?: number
    priority?: boolean
    completionDate?: Date
  }
}

export interface UpdateStepData {
  taskId: number,
  stepId: number,
  categoryId: number,
  newDataObj: { completed: boolean } | { title: string }
}

export type SortProperty = 'priority' | 'title' | 'createdAt' | 'completionDate'
export type SortDirection = 'DESC' | 'ASC'

export interface SortParams {
  property: SortProperty
  direction: SortDirection
}


export type CurrentSort = 'алфавиту' | 'дате создания' | 'важности' | 'дате выполнения' | ''

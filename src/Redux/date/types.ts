export type Dates = {
  '': number;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface DateSliceState {
  dates : Dates[] ;
  status: Status ;
}

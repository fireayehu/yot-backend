import { ParsedQs } from 'qs';
import { FindOperator } from 'typeorm';
export interface IFilter {
  [key: string]:
    | string
    | string[]
    | ParsedQs
    | ParsedQs[]
    | FindOperator<string>
    | any
    | undefined;
}

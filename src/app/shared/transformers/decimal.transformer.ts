import { ValueTransformer } from 'typeorm';

export class DecimalTransformer implements ValueTransformer {
  /**
   * Used to marshal Decimal when writing to the database.
   */
  to(data: number): number {
    return data;
  }
  /**
   * Used to unmarshal Decimal when reading from the database.
   */
  from(data: string): number | null {
    return data ? parseFloat(data) : null;
  }
}

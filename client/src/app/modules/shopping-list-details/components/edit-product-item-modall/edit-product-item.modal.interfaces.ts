import { ProductUnits } from '../../../../app.enums';

export interface EditProductItemFormInitialValues {
  name: string;
  quantity?: number;
  unit?: ProductUnits | string;
  price?: number;
}

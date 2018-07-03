import { FormGroup } from "@angular/forms";

// ==================
// SELECT
// ==================

export interface Selection {
  countryForm: FormModelObject;
  quantity: QuantityValue;
}

export interface IndeterminateStatus {
  allSubregionsChecked: boolean;
  allSubregionsUnchecked: boolean;
}


// ==================
// SELECT-COUNTRY
// ==================

export type CountryTally = _.Dictionary<number>;

export type RegionModel = {
  checked: boolean | null;
  indeterminate: boolean;
}

export type SubregionModel = boolean;

export interface FormModelUpdate {
  [place: string]: RegionModel | SubregionModel;
}

export interface FormModelObject {
  [place: string]: FormGroup | boolean;
}


// ==================
// SELECT-QUANTITY
// ==================

export type QuantityValue = number | undefined;

export interface Quantity {
  display: string;
  value: QuantityValue;
}

export interface QuantityModel {
  quantity: QuantityValue;
}

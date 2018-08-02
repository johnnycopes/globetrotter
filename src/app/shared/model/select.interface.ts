import { FormGroup } from "@angular/forms";

// ==================
// SELECT
// ==================

export interface Selection {
  countriesForm: FormModelObject;
  quantity: OptionValue;
}

export interface IndeterminateStatus {
  allSubregionsChecked: boolean;
  allSubregionsUnchecked: boolean;
}


// ==================
// SELECT-COUNTRY
// ==================

export type CountryTally = _.Dictionary<number>;
export type Tally = _.Dictionary<number>;

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

type OptionValue = number | undefined;

export interface Option {
  display: string;
  value: OptionValue;
}

export interface OptionModel {
  option: OptionValue;
}

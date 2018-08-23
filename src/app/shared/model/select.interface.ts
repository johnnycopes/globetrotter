import { FormGroup } from "@angular/forms";

// ==================
// SELECT
// ==================

export interface Selection {
  countries: any;
  quantity: OptionValue;
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

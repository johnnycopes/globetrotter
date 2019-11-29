import { Validators } from "@angular/forms";

export interface FormInput {
  name: string,
  type: string,
  label: string,
  validators: Validators[]
}

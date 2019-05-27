import { QuizTypes } from "./quiz-types.enum";
import { CheckboxStates } from "../shared/nested-checkboxes/nested-checkboxes.component";

export interface Selection {
  type: QuizTypes;
  countries: CheckboxStates;
  quantity: number | null;
}

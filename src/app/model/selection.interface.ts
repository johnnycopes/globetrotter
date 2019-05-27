import { QuizTypes } from './quiz-types.enum';
import { CheckboxStates } from '../shared/nested-checkboxes/nested-checkboxes.component';
import { QuizQuantity } from './quiz-quantity.type';

export interface Selection {
  type: QuizTypes;
  countries: CheckboxStates;
  quantity: QuizQuantity;
}

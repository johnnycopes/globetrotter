import { QuizType } from './quiz-type.enum';
import { QuizQuantity } from './quiz-quantity.type';
import { CheckboxStates } from '../components/nested-checkboxes/nested-checkboxes.component';

export class Selection {
  type: QuizType = QuizType.flagsCountries;
  quantity: QuizQuantity = 5;
  countries: CheckboxStates = {};
}

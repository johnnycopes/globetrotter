import { QuizTypes } from './quiz-types.enum';
import { QuizQuantity } from './quiz-quantity.type';
import { CheckboxStates } from '../shared/nested-checkboxes/nested-checkboxes.component';

export class Selection {

  constructor(
    public type: QuizTypes,
    public quantity: QuizQuantity,
    public countries: CheckboxStates
  ) { }

}

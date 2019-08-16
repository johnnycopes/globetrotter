import { QuizType } from './quiz-type.enum';
import { QuizQuantity } from './quiz-quantity.type';
import { CheckboxStates } from '../components/nested-checkboxes/nested-checkboxes.component';

export class Selection {

  constructor(
    public type: QuizType,
    public quantity: QuizQuantity,
    public countries: CheckboxStates
  ) { }

}

import { QuizType } from './quiz-type.enum';
import { QuizQuantity } from './quiz-quantity.type';
import { CheckboxStates } from '../components/nested-checkboxes/nested-checkboxes.component';

export class Selection {

  constructor(
    public type: QuizType = QuizType.flagsCountries,
    public quantity: QuizQuantity = 5,
    public countries: CheckboxStates = {}
  ) { }

}

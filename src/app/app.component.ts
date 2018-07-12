import { Component } from '@angular/core';
import { Selection } from './shared/model/select.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selection: Selection;

  onSelectionMade(selection: Selection) {
    this.selection = {
      countryForm: selection.countryForm,
      quantity: selection.quantity
    };
    window.scrollTo(0, 0);
  }

  reset() {
    this.selection = null;
  }
}

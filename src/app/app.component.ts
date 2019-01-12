import { Component } from '@angular/core';
import { Selection } from 'src/app/select/select.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  started = false;
  selection: Selection;

  onStart() {
    this.started = true;
  }

  onSelectionMade(selection: Selection) {
    this.selection = {
      countries: selection.countries,
      quantity: selection.quantity
    };
    window.scrollTo(0, 0);
  }

  reset() {
    this.selection = null;
  }
}

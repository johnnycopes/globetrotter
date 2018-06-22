import { Component } from '@angular/core';
import { FormModelObject } from './selection/selection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selection: FormModelObject;

  onSelectionMade(selection: FormModelObject) {
    this.selection = selection;
  }
}

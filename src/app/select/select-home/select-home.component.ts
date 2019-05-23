import { Component } from '@angular/core';

import { SelectService } from '../select.service';

@Component({
  selector: 'app-select-home',
  templateUrl: './select-home.component.html',
  styleUrls: ['./select-home.component.scss']
})
export class SelectHomeComponent {

  constructor(private selectService: SelectService) { }

  onClick() {
    this.selectService.nextScreen();
  }

}

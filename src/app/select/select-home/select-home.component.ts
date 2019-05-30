import { Component } from '@angular/core';

import { PageService } from 'src/app/core/page/page.service';

@Component({
  selector: 'app-select-home',
  templateUrl: './select-home.component.html',
  styleUrls: ['./select-home.component.scss']
})
export class SelectHomeComponent {

  constructor(private pageService: PageService) { }

  onClick(): void {
    this.pageService.nextPage();
  }

}

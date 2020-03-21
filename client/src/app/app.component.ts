import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { RouterService } from '@services/router/router.service';
import { ErrorService } from '@services/error/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private routerService: RouterService,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.loading$ = this.routerService.getLoading();
    this.error$ = this.errorService.getGlobalError();
  }
}

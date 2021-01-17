import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { RouterService } from '@services/router/router.service';
import { ErrorService } from '@services/error/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading$: Observable<boolean>;
  error$: Observable<boolean>;

  constructor(
    private routerService: RouterService,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.loading$ = this.routerService.state.observe(lens => lens.to('loading'));
    this.error$ = this.errorService.errors.observe(lens => lens.to('global')).pipe(
      map(error => !!error)
    );
  }
}

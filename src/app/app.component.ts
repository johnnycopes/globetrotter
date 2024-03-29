import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { RouterService } from '@services/router.service';
import { ErrorService } from '@services/error.service';

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
    this.loading$ = this.routerService.state.pipe(
      map(({ loading }) => loading)
    );
    this.error$ = this.errorService.errors.pipe(
      map(({ global }) => !!global)
    );
  }
}

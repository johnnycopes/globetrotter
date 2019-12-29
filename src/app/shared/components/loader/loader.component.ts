import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() isComplete$: Observable<any>;
  loading: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.isComplete$.subscribe(
      { complete: () => this.loading = false }
    );
  }

}

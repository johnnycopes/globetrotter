import { Component, OnInit, Input } from '@angular/core';

type AlertType = 'success' | 'error';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() type: AlertType = 'error';
  @Input() large: boolean;

  constructor() { }

  ngOnInit() {
  }

}

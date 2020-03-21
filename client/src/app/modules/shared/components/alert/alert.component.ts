import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

type AlertType = 'success' | 'error';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent {
  @Input() type: AlertType = 'error';
  @Input() large: boolean;
}

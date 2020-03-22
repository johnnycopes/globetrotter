import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

type TAlertType = 'success' | 'error';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent {
  @Input() type: TAlertType = 'error';
  @Input() large: boolean;
}

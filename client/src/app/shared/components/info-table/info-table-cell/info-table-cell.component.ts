import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-info-table-cell',
  templateUrl: './info-table-cell.component.html',
  styleUrls: ['./info-table-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoTableCellComponent {
  @Input() category: string;
}

import { Component, Input, ChangeDetectionStrategy, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-small-caps-content',
  templateUrl: './small-caps-content.component.html',
  styleUrls: ['./small-caps-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmallCapsContentComponent {
  @Input() header: string;
  @Input() template: TemplateRef<any>;
}

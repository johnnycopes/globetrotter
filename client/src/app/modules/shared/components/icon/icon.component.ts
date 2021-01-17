import { Component, Input, Output, EventEmitter, OnInit, TemplateRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent implements OnInit {
  @Input() icon: string;
  @Input() highlighted: boolean;
  @Output() clicked = new EventEmitter<void>();
  @ViewChild('africaTemplate', { static: true }) africaTemplate: TemplateRef<unknown>;
  @ViewChild('americasTemplate', { static: true }) americasTemplate: TemplateRef<unknown>;
  @ViewChild('airplaneTemplate', { static: true }) airplaneTemplate: TemplateRef<unknown>;
  @ViewChild('asiaTemplate', { static: true }) asiaTemplate: TemplateRef<unknown>;
  @ViewChild('cancelTemplate', { static: true }) cancelTemplate: TemplateRef<unknown>;
  @ViewChild('earthTemplate', { static: true }) earthTemplate: TemplateRef<unknown>;
  @ViewChild('europeTemplate', { static: true }) europeTemplate: TemplateRef<unknown>;
  @ViewChild('globetrotterTemplate', { static: true }) globetrotterTemplate: TemplateRef<unknown>;
  @ViewChild('lightbulbTemplate', { static: true }) lightbulbTemplate: TemplateRef<unknown>;
  @ViewChild('luggageTemplate', { static: true }) luggageTemplate: TemplateRef<unknown>;
  @ViewChild('oceaniaTemplate', { static: true }) oceaniaTemplate: TemplateRef<unknown>;
  @ViewChild('userTemplate', { static: true }) userTemplate: TemplateRef<unknown>;
  templatesDict: Record<string, TemplateRef<unknown>>;
  clickable: boolean;

  ngOnInit(): void {
    this.templatesDict = {
      Africa: this.africaTemplate,
      Americas: this.americasTemplate,
      Airplane: this.airplaneTemplate,
      Asia: this.asiaTemplate,
      Cancel: this.cancelTemplate,
      Earth: this.earthTemplate,
      Europe: this.europeTemplate,
      Globetrotter: this.globetrotterTemplate,
      Lightbulb: this.lightbulbTemplate,
      Luggage: this.luggageTemplate,
      Oceania: this.oceaniaTemplate,
      User: this.userTemplate
    };
    this.clickable = this.clicked.observers.length > 0;
  }

  onClick(): void {
    this.clicked.emit();
  }
}

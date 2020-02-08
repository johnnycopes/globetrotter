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
  @ViewChild('africaTemplate') africaTemplate: TemplateRef<any>;
  @ViewChild('americasTemplate') americasTemplate: TemplateRef<any>;
  @ViewChild('airplaneTemplate') airplaneTemplate: TemplateRef<any>;
  @ViewChild('asiaTemplate') asiaTemplate: TemplateRef<any>;
  @ViewChild('cancelTemplate') cancelTemplate: TemplateRef<any>;
  @ViewChild('earthTemplate') earthTemplate: TemplateRef<any>;
  @ViewChild('europeTemplate') europeTemplate: TemplateRef<any>;
  @ViewChild('globetrotterTemplate') globetrotterTemplate: TemplateRef<any>;
  @ViewChild('lightbulbTemplate') lightbulbTemplate: TemplateRef<any>;
  @ViewChild('luggageTemplate') luggageTemplate: TemplateRef<any>;
  @ViewChild('oceaniaTemplate') oceaniaTemplate: TemplateRef<any>;
  @ViewChild('userTemplate') userTemplate: TemplateRef<any>;
  templatesDict: _.Dictionary<TemplateRef<any>>;
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

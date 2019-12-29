import { Component, Input, Output, EventEmitter, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() icon: string;
  @Input() highlighted: boolean;
  @Output() clicked = new EventEmitter<void>();
  @ViewChild('africaTemplate', { static: true }) africaTemplate: TemplateRef<any>;
  @ViewChild('americasTemplate', { static: true }) americasTemplate: TemplateRef<any>;
  @ViewChild('airplaneTemplate', { static: true }) airplaneTemplate: TemplateRef<any>;
  @ViewChild('asiaTemplate', { static: true }) asiaTemplate: TemplateRef<any>;
  @ViewChild('cancelTemplate', { static: true }) cancelTemplate: TemplateRef<any>;
  @ViewChild('earthTemplate', { static: true }) earthTemplate: TemplateRef<any>;
  @ViewChild('europeTemplate', { static: true }) europeTemplate: TemplateRef<any>;
  @ViewChild('globetrotterTemplate', { static: true }) globetrotterTemplate: TemplateRef<any>;
  @ViewChild('lightbulbTemplate', { static: true }) lightbulbTemplate: TemplateRef<any>;
  @ViewChild('luggageTemplate', { static: true }) luggageTemplate: TemplateRef<any>;
  @ViewChild('oceaniaTemplate', { static: true }) oceaniaTemplate: TemplateRef<any>;
  @ViewChild('userTemplate', { static: true }) userTemplate: TemplateRef<any>;
  templatesDict: _.Dictionary<TemplateRef<any>>;

  constructor() { }

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
  }

  onClick(): void {
    this.clicked.emit();
  }
}

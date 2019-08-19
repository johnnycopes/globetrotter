import { Component, Input, Output, EventEmitter, OnInit, TemplateRef, ViewChild } from '@angular/core';

type IconTemplates = _.Dictionary<TemplateRef<any>>;

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
  @ViewChild('asiaTemplate', { static: true }) asiaTemplate: TemplateRef<any>;
  @ViewChild('earthTemplate', { static: true }) earthTemplate: TemplateRef<any>;
  @ViewChild('europeTemplate', { static: true }) europeTemplate: TemplateRef<any>;
  @ViewChild('globetrotterTemplate', { static: true }) globetrotterTemplate: TemplateRef<any>;
  @ViewChild('oceaniaTemplate', { static: true }) oceaniaTemplate: TemplateRef<any>;
  templatesDict: IconTemplates;

  constructor() { }

  ngOnInit(): void {
    this.templatesDict = {
      Africa: this.africaTemplate,
      Americas: this.americasTemplate,
      Asia: this.asiaTemplate,
      Earth: this.earthTemplate,
      Europe: this.europeTemplate,
      Globetrotter: this.globetrotterTemplate,
      Oceania: this.oceaniaTemplate
    };
  }

  onClick(): void {
    this.clicked.emit();
  }
}

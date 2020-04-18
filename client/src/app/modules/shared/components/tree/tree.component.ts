import { Component, Input, OnInit, TemplateRef, ChangeDetectionStrategy } from '@angular/core';

export interface ITreeProvider<T> {
  getId(item: T): string;
  getChildren(item: T): T[];
  getParent?(item: T): T | undefined;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeComponent<T> implements OnInit {
  @Input() item: T;
  @Input() treeProvider: ITreeProvider<T>;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() indentChildItems: boolean = true;
  public id: string;
  public parent: T | undefined;
  public children: T[];

  constructor() { }

  public ngOnInit(): void {
    if (!this.item || !this.treeProvider) {
      throw new Error('Missing input(s): item and treeProvider must be passed to the tree component');
    }
    this.id = this.treeProvider.getId(this.item);
    this.children = this.treeProvider.getChildren(this.item);
    const parent = this.treeProvider.getParent && this.treeProvider.getParent(this.item);
    if (!!parent) {
      this.parent = parent;
    }
  }
}

import { Component, Input, OnInit, TemplateRef, ChangeDetectionStrategy } from "@angular/core";

export interface ITreeProvider<T> {
  getId(item: T): string;
  getParent(item: T): T | undefined;
  getChildren(item: T): T[];
}

@Component({
  selector: "app-tree",
  templateUrl: "./tree.component.html",
  styleUrls: ["./tree.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeComponent<T> implements OnInit {
  @Input() item: T;
  @Input() treeProvider: ITreeProvider<T>;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() indentChildItems: boolean = true;
  public id: string;
  public parent: T | undefined;
  public parentId: string | undefined;
  public children: T[];

  constructor() { }

  public ngOnInit(): void {
    if (!this.item || !this.treeProvider) {
      throw new Error("An item and a tree provider must be passed to the tree component");
    }
    this.id = this.treeProvider.getId(this.item);
    this.parent = this.treeProvider.getParent(this.item);
    this.children = this.treeProvider.getChildren(this.item);
    if (!!this.parent) {
      this.parentId = this.treeProvider.getId(this.parent);
    }
  }
}

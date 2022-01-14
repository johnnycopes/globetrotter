import { Component, ChangeDetectionStrategy } from "@angular/core";

import { fadeInAnimation } from "@utility/animations";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation]
})
export class AccountComponent { }

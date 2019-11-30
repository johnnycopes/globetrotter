import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() error: boolean;
  @Input() control: AbstractControl;
  @Input() errorMessage: string;

  constructor() { }

  ngOnInit() {
    // console.log(this.label, this.control);
  }

}

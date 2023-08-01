import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appConfiguration]',
})
export class ConfigurationDirective {
  @Input() background!: string;

  constructor() {}

  @HostBinding('style.background')
  bg!: string;

  ngOnInit() {
    this.bg = this.background;
  }
}

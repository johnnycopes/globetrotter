import { animation, style, animate } from "@angular/animations";

export const fadeIn = animation([
  style({ opacity: '0' }),
  animate(
    `{{ timing }}ms ease-in`,
    style({ opacity: '1' })
  )
]);

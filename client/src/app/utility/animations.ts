import {
  animation,
  style,
  animate,
  trigger,
  transition,
  useAnimation,
  state,
  query,
  stagger,
  animateChild
} from "@angular/animations";

import { EAnimationDuration } from "@models/animation-duration.enum";

const fadeIn = animation([
  style({ opacity: '0' }),
  animate(
    `{{ timing }}ms {{ delay }}ms ease-in`,
    style({ opacity: '1' })
  )
]);

export const fadeInAnimation =
  trigger('fadeIn', [
    transition(':enter', [
      useAnimation(fadeIn, {
        params: {
          timing: EAnimationDuration.screenTransition,
          delay: 0
        }
      })
    ])
  ]);

export const fadeInWithFixedSlideablePanelDelayAnimation =
  trigger('fadeIn', [
    transition(':enter', [
      useAnimation(fadeIn, {
        params: {
          timing: EAnimationDuration.screenTransition,
          delay: EAnimationDuration.fixedSlideablePanel
        }
      })
    ])
  ]);

export const fadeInWithCardsFadeInDelayAnimation =
  trigger('fadeIn', [
    transition(':enter', [
      useAnimation(fadeIn, {
        params: {
          timing: EAnimationDuration.screenTransition,
          delay: EAnimationDuration.cardsFadeInDelay
        }
      })
    ])
  ]);

export const visibilityAnimation =
  trigger('visibility', [
    state('invisible', style({
      opacity: 0
    })),
    state('visible', style({
      opacity: 1
    })),
    transition('* => *', animate(`${EAnimationDuration.screenTransition}ms ease-in-out`))
  ]);


export const flipAnimation =
  trigger('flip', [
    state('front', style({
      transform: 'rotateY(0)'
    })),
    state('back', style({
      transform: 'rotateY(180deg)'
    })),
    transition('front => back', animate(`${EAnimationDuration.flipCard}ms ease-in`)),
    transition('back => front', animate(`${EAnimationDuration.flipCard}ms ease-out`))
  ]);

export const disabledAnimation =
  trigger('disabled', [
    state('disabled', style({
      filter: 'grayscale(100%)',
      cursor: 'not-allowed'
    })),
    transition('* => disabled', animate(`${EAnimationDuration.flipCard}ms ease-in`))
  ]);

export const guessAnimation =
  trigger('guess', [
    state('none', style({
      border: 'none',
      padding: '20px'
    })),
    state('correct', style({
      border: '20px solid limegreen',
      padding: '0'
    })),
    state('incorrect', style({
      border: '20px solid crimson',
      padding: '0'
    })),
    transition('* => *', animate(`${EAnimationDuration.flipCard}ms ease-in`))
  ]);

export const positionAnimation =
  trigger('position', [
    state('offscreen', style({
      transform: 'translateY(-100vh)'
    })),
    state('header', style({
      transform: 'translateY(calc(-100vh + 96px))' // this value must kept in sync with the header height in SCSS
    })),
    state('fullscreen', style({
      transform: 'translateY(0)'
    })),
    transition('* => *', animate(`${EAnimationDuration.fixedSlideablePanel}ms ease-in-out`))
  ]);

export const staggerAnimation =
  trigger('stagger', [
    transition(':enter', [
      query(':enter', stagger(`${EAnimationDuration.cardsStagger}ms`, [animateChild()]))
    ])
  ]);

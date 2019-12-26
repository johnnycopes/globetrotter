import { storiesOf, moduleMetadata } from '@storybook/angular';
import {
  withKnobs,
  select
} from '@storybook/addon-knobs/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TabsetComponent, TabsetContentVisibility } from 'src/app/shared/components/tabset/tabset.component';
import { TabComponent } from 'src/app/shared/components/tabset/tab/tab.component';
import { FixedSlideablePanelComponent } from 'src/app/shared/components/fixed-slideable-panel/fixed-slideable-panel.component';
import { ContainerComponent } from 'src/app/shared/components/container/container.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { MenuLinkComponent } from 'src/app/shared/components/menu-link/menu-link.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

const visibilityStates: TabsetContentVisibility[] = ['visible', 'invisible'];

storiesOf('Shared | Tabset', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      declarations: [
        TabsetComponent,
        TabComponent,
        FixedSlideablePanelComponent,
        ContainerComponent,
        IconComponent,
        MenuLinkComponent,
        ButtonComponent
      ]
    })
  )
  .add('with default template', () => {
    return {
      template: `
        <app-tabset [contentVisibility]="contentVisibility">
          <app-tab name="Type">
            <h1>type content here</h1>
          </app-tab>
          <app-tab name="Quantity">
            <h1>quantity content here</h1>
          </app-tab>
          <app-tab name="Countries">
            <h1>countries content here</h1>
          </app-tab>
        </app-tabset>
      `,
      props: {
        contentVisibility: select('contentVisibility', visibilityStates, 'visible')
      }
    };
  })
  .add('with custom template', () => {
    return {
      template: `
        <ng-template #tabsetControlsTemplate
          let-tabs="tabs"
          >
          <app-fixed-slideable-panel class="tabset"
            position="header"
            >
            <app-container header>
              <app-icon style="width: 24px"
                left
                icon="Cancel"
                [highlighted]="true"
                >
              </app-icon>
              <ng-container center>
                <app-menu-link
                  *ngFor="let tab of tabs"
                  [name]="tab.name"
                  [selected]="tab.selected"
                  (clicked)="tabset.onSelectTab(tab)"
                  >
                </app-menu-link>
              </ng-container>
              <app-button
                right
                buttonText="Launch"
                buttonStyle="primary"
                >
              </app-button>
            </app-container>
          </app-fixed-slideable-panel>
        </ng-template>

        <div style="padding-top: 96px">
          <app-tabset #tabset
            [controlsTemplate]="tabsetControlsTemplate"
            [contentVisibility]="tabsetContentVisibility"
            >
            <app-tab name="Type">
              <h1>type content here</h1>
            </app-tab>
            <app-tab name="Quantity">
              <h1>quantity content here</h1>
            </app-tab>
            <app-tab name="Countries">
              <h1>countries content here</h1>
            </app-tab>
          </app-tabset>
        </div>
      `,
      props: {
        contentVisibility: select('contentVisibility', visibilityStates, 'visible')
      }
    };
  });

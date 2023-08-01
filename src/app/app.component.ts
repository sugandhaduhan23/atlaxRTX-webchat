import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

import { Store } from '@ngrx/store';
import { ConfigurationAppState } from './store/state/state';
import { ActionTypes } from './store/actions/action';

import { Configuration } from './models/configuration';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AppComponent {
  isOpen = false; 
  configuration!: Configuration; 

  constructor(private commonService: CommonService,
              private store: Store<ConfigurationAppState>) {}

  ngOnInit(): void {
    // Fetch the configuration data when the component is initialized
    // This will fetch the dymanic values like chatbot name, theme, icon.
    // I have added only a few properties just to show we can control through
    // the database for different clients without touching the UI code.
    this.getConfiguration();
  }

  getConfiguration() {
    this.commonService.getConfigurations().subscribe((res: Configuration) => {
      this.configuration = res;
      // Dispatch the configuration data to the store
      // If the configuration is required in other components
      // user can just get it from the store avoiding any unnecessary API calls.
      this.dispatchDateToStore(res);
    });
  }

  dispatchDateToStore(data: Configuration) {
    // Dispatch the configuration data to the store by triggering the appropriate action
    this.store.dispatch({
      type: ActionTypes.SAVE_CONFIGURATION,
      payload: JSON.parse(JSON.stringify(data)),
    });
  }

  toggleChatWidget() {
    // Toggle the visibility of the chat widget and the chat button
    this.isOpen = !this.isOpen;
  }
}

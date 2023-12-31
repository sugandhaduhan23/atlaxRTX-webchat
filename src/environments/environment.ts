// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ACTION: {
    CANCEL: 'cancel',
    CLOSE: 'close',
    ERASE: 'erase',
  },
  MESSAGE: {
    CANCEL:
      'Oh, it looks like you cancelled out of your request to connect with us.',
    SUBMIT: 'Thank you, for providing your contact information.',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

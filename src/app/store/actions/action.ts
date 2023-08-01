// Import necessary modules
import { Action } from '@ngrx/store';
import { Configuration } from 'src/app/models/configuration';
import { Message } from 'src/app/models/message';

// Enumerate action types to be used in the reducer
export enum ActionTypes {
  SAVE_CONFIGURATION = 'SAVE_CONFIGURATION',
  SAVE_CONVERSATION = 'SAVE_CONVERSATION',
  DELETE_CONVERSATION = 'DELETE_CONVERSATION'
}

// Define a class for the SAVE_CONFIGURATION action
export class ConfigurationAction implements Action {
  readonly type = ActionTypes.SAVE_CONFIGURATION;
  constructor(public payload: Configuration) {}
}

// Define a class for the SAVE_CONVERSATION action
export class Conversation implements Action {
  readonly type = ActionTypes.SAVE_CONVERSATION;
  constructor(public payload: Message) {}
}

// Define a class for the DELETE_CONVERSATION action
export class DeleteConversation implements Action {
  readonly type = ActionTypes.DELETE_CONVERSATION;
  constructor() {}
}

// Create a union type 'action' that represents all possible action classes
export type action = ConfigurationAction | Conversation | DeleteConversation;

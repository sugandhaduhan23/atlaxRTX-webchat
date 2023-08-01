// Import necessary actions and model
import { Message } from 'src/app/models/message';
import { ConfigurationAction, Conversation, ActionTypes, action } from '../actions/action';
import { Configuration } from 'src/app/models/configuration';

// Define the initial state for the configuration
const initialState: Configuration = {
  name: '',
  icon: '',
  background: '',
  fontSize: '',
};

// Configuration reducer function
export function configurationReducer(state: Configuration = initialState, action: ConfigurationAction) {
    switch (action.type) {
        case ActionTypes.SAVE_CONFIGURATION:
            // When SAVE_CONFIGURATION action is dispatched,
            // return a new state by merging the initial state and the payload from the action.
            // This way, the configuration state is updated with the new values provided in the payload.
            return { ...initialState, ...action.payload };
        default:
            // For any other action, return the current state as is.
            return state;
    }
}

// Define the initial state for the Conversation
const conversationInitialState: Message[] = [];

// Conversation reducer function
export function conversationReducer(state: Message[] = conversationInitialState, action: action) {
    switch (action.type) {
        case ActionTypes.SAVE_CONVERSATION:
            // When SAVE_CONVERSATION action is dispatched,
            // add the payload (new message) to the current state (message array) using spread operator.
            // This way, the new message is added to the existing conversation state.
            return [...state, action.payload];
        case ActionTypes.DELETE_CONVERSATION:
            // When DELETE_CONVERSATION action is dispatched,
            // return an empty array, effectively clearing the conversation state.
            return [];
        default:
            // For any other action, return the current state as is.
            return state;
    }
}

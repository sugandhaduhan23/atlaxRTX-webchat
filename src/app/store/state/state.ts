import { Configuration } from 'src/app/models/configuration';
import { Message } from 'src/app/models/message';

export interface ConfigurationAppState {
  configuration: Configuration;
}

export interface ConversationAppState {
  message: Message[];
}

export type AppState = ConfigurationAppState | ConversationAppState;

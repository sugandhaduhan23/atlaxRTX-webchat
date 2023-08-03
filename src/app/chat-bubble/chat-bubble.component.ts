import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { Message } from '../models/message';
import { Configuration } from '../models/configuration';
import { ConversationService } from '../services/conversation.service';
import { environment } from 'src/environments/environment';
import { ActionTypes } from '../store/actions/action';
import { AppState } from '../store/state/state';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss'],
  animations: [
    // Animation for chat bubble flying up when added to the DOM
    trigger('flyUp', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate(400),
      ]),
      transition(':leave', [
        animate(400, style({ transform: 'translateY(0%)' })),
      ]),
    ]),
    // Animation for expanding and collapsing messages
    trigger('expand', [
      transition(':enter', [
        style({ height: '0', overflow: 'hidden' }),
        animate('300ms ease-out', style({ height: '*' })),
      ]),
    ]),
  ],
})
export class ChatBubbleComponent implements OnInit {
  @Output() disableUserInput = new EventEmitter<boolean>();
  @Output() scroll = new EventEmitter<void>();

  // Initialize class properties
  currentTime = new Date();
  connectionEstablished = false;
  previousConversation: Message[] = [];
  configuration!: Configuration;
  messages: Message[] = [];
  time = 0;

  constructor(
    private conversationService: ConversationService,
    private sanitizer: DomSanitizer,
    private store: Store<AppState>
  ) {
    // Subscribe to the configuration and conversation state in the Redux store
    this.store.select((state: any) => state.configuration).subscribe((response: Configuration) => {
      this.configuration = response;
    });
    this.store.select((state: any) => state.conversation).subscribe((response: Message[]) => {
      this.previousConversation = [...response];
    });
  }

  ngOnInit(): void {
    // Check if there is any previous conversation in the store which has not been ended
    // If not establish a fresh connection
    if (this.previousConversation.length) {
      this.connectionEstablished = true;
      this.messages = [...this.previousConversation];
    } else {
      this.checkConnectionEstablished();
    }
  }

  checkConnectionEstablished() {
    // Simulate connection establishment after 2000ms
    setTimeout(() => {
      this.connectionEstablished = true;
      this.startConversation();
    }, 2000);
  }

  startConversation() {
    // Start the conversation with the conversation service and fetch the welcome message
    this.conversationService.startCoversation().subscribe((res: any) => {
      this.pushMessage(res);
    });
  }

  pushMessage(message: Message) {
    // Add the message to the list of messages and handle user input
    // messages is an array to maintain the conversation on UI and
    // show the appropriate content and elements based on the
    // type of message received
    this.messages.push({ ...message, suggestedReplies: [] });
    this.scroll.emit();
    this.delayMessageLoading();
    if (message.suggestedReplies.length || message.type == 'form') {
      this.disableUserInput.emit(true);
      this.loadSuggestedReplies(message.suggestedReplies);
    } else {
      this.disableUserInput.emit(false);
    }
  }

  sanitizeUrl(url: any) {
    // Sanitize the provided URL to avoid security issues for videos and images
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  delayMessageLoading() {
    // Simulate a delay in message loading to show loading dots
    const len = this.messages.length;
    const message = this.messages[len - 1];
    setTimeout(() => {
      //Turn off loading dots animation and load the actual message
      message.isLoading = false;
      this.dispatchDateToStore(message);
      if (message.type == 'form') 
            message.showForm = true;
      this.scroll.emit();
    }, 2000);
  }

  dispatchDateToStore(message: Message) {
    // Dispatch the configuration data to the store by triggering the appropriate action
    // Store the conversation in data store if my mistake the user clicks on close button
    // Conversation can be fetched using data store
    this.store.dispatch({
      type: ActionTypes.SAVE_CONVERSATION,
      payload: JSON.parse(JSON.stringify(message)),
    });
  }

  loadSuggestedReplies(suggestedReplies: string[]) {
    // Load suggested replies for user selection after a delay
    let len = this.messages.length;
    setTimeout(() => {
      this.messages[len - 1].suggestedReplies = [...suggestedReplies];
      this.scroll.emit();
    }, 3000);
  }

  toggleVideo(index: number) {
    // Toggle video playback for the selected message
    this.messages[index].loadVideo = !this.messages[index].loadVideo;
  }

  sendUserMessage(message: string) {
    // Send user-typed message in textarea and get the response from the chatbot
    let userMessage: Message = {
      message: message,
      isLoading: false,
      userTyped: true,
      type: 'text',
      suggestedReplies: [],
    };
    this.pushMessage(userMessage);
    this.getReponsefromChatbot();
  }

  sendMessage(msg: Message, option: string) {
    // Send user-selected message from the suugested replies and get the response from the chatbot
    msg.suggestedReplies = [];
    let userSelectedMsg: Message = {
      message: option,
      isLoading: false,
      userTyped: true,
      type: 'text',
      suggestedReplies: [],
    };
    setTimeout(() => {
      this.pushMessage(userSelectedMsg);
      this.getReponsefromChatbot();
    }, 300);
  }

  getReponsefromChatbot() {
    // Get the chatbot's response from the conversation service
    // These will be random messages as there is no actual server conenction
    this.conversationService.getResponse().subscribe((res: Message) => {
      this.pushMessage(res);
    });
  }

  closeForm(type: string, msg: Message) {
    // Close the form and handle the form submission or cancellation
    const msgText = type == environment.ACTION.CANCEL ? environment.MESSAGE.CANCEL : environment.MESSAGE.SUBMIT;
    msg.showForm = false;
    let message: Message = {
      message: msgText,
      isLoading: true,
      userTyped: false,
      type: 'text',
      suggestedReplies: [],
    };
    this.pushMessage(message);
  }
}

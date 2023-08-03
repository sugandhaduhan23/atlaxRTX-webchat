import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Configuration } from '../models/configuration';
import { Store } from '@ngrx/store';
import { ConfigurationAppState } from '../store/state/state';
import { ChatBubbleComponent } from '../chat-bubble/chat-bubble.component';
import { environment } from 'src/environments/environment';
import { ActionTypes } from '../store/actions/action';

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss'],
})
export class ChatWidgetComponent implements OnInit {
  @ViewChild('scrollMe', { static: false }) myScrollContainer!: ElementRef;
  @ViewChild('chatInput', { static: false }) chatInput!: ElementRef;
  @ViewChild('messageCmp', { static: true }) messageCmp!: ChatBubbleComponent;

  @Output() close = new EventEmitter<void>();

  messageInput!: string;
  disableMessageInput = true;
  configuration!: Configuration;

  constructor(private store: Store<ConfigurationAppState>) {
    // Subscribe to the configuration state from the store
    this.store.select((state) => state.configuration).subscribe((response) => {
          this.configuration = response;
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // Scroll to the bottom after the view has been checked (when new messages are added)
    this.scrollToBottom();
  }

  scrollToBottom(): void {
      // Scroll to the bottom of the chat container
      setTimeout(()=>{
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      }, 200)
  }

  sendMessage(event?: Event) {
    // Prevent default form submission behavior if the method is triggered when enter key is pressed
    if (event) 
        event.preventDefault();

    const message = this.chatInput.nativeElement.value.trim();

    // If the message is not empty, send the user message through the chat bubble component
    if (message) 
        this.messageCmp.sendUserMessage(message);

    //Once the message is sent clear the textarea
    this.chatInput.nativeElement.value = '';
  }

  disableInput(disable: any) {
    // Disable or enable the textarea
    // Enable the text area only if the there are no suggested replies from the chatbot
    this.disableMessageInput = disable;
  }

  closeChat(action: string) {
    //Empty the data store to clear previous conversations
    if (action == environment.ACTION.ERASE){
      this.dispatchDateToStore();
      this.messageCmp.messages = [];
    }
    // Emit the close event to notify the parent component to close the chat widget
    this.close.emit();
  }

  dispatchDateToStore() {
    // Dispatch the DELETE_CONVERSATION action to clear conversation history
    this.store.dispatch({
      type: ActionTypes.DELETE_CONVERSATION,
    });
  }
}

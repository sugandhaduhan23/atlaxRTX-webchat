import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Configuration } from '../models/configuration';
import { AppState } from '../store/state/state';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
})
export class ChatHeaderComponent implements OnInit {
  @Output() close = new EventEmitter<string>();

  configuration!: Configuration;

  constructor(private store: Store<AppState>) {
    // Subscribe to the configuration state from the store
    this.store.select((state: any) => state.configuration).subscribe((response) => {
          this.configuration = response;
    });
  }

  ngOnInit(): void {}

  closeChat(action: string) {
    // Emit the close event to notify the parent component to close the chat widget
    this.close.emit(action);
  }
}

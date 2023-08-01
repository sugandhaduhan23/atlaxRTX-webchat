// Import necessary modules and components from Angular and third-party libraries
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';

// Import the app-routing.module that defines the app's routing configuration
import { AppRoutingModule } from './app-routing.module';

// Import the root component of the application
import { AppComponent } from './app.component';

// Import other components used in the application
import { ChatWidgetComponent } from './chat-widget/chat-widget.component';
import { ChatBubbleComponent } from './chat-bubble/chat-bubble.component';
import { ConfigurationDirective } from './directives/configuration.directive';
import { AutoTextResizeDirective } from './directives/auto-text-resize.directive';
import { configurationReducer, conversationReducer } from './store/reducer/reducer';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { Configuration } from './models/configuration';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form/user-form.component';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { Message } from './models/message';

@NgModule({
  // Declarations: Register components, directives, and pipes used in the application
  declarations: [
    AppComponent,
    ChatWidgetComponent,
    ChatBubbleComponent,
    ConfigurationDirective,
    AutoTextResizeDirective,
    UserFormComponent,
    ChatHeaderComponent,
  ],
  // Imports: Register the required modules from Angular and third-party libraries
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      configuration: configurationReducer as ActionReducer<Configuration>,
      conversation: conversationReducer as ActionReducer<Message[]>,
    }), // Configures the application state management using NgRx Store
  ],
  providers: [
    // Configure the default options for the Material form fields
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

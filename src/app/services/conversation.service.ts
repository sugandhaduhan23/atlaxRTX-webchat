import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  // Dummy messages for simulating conversation with the chatbot
  // Rach Message object can have different properties depending
  // on the type of meesage being returned. For ex: if type is image
  // the imageUrl will also be returned.
  dummyMessages: Message[] = [
    {
      message: "Good Evening! Thank you for your interest in SFBU, a top-ranked school nestled in San Francisco Bay Area. \n\nI'm Alice, your digital assistant. How can I help you today.",
      type: 'text',
      userTyped: false,
      isLoading: true,
      suggestedReplies: ['MBA', 'MSCS', 'MSEE', 'PhD', 'Return to Main Menu'],
    },
    {
      message: 'What can I help you with?',
      type: 'text',
      userTyped: false,
      isLoading: true,
      suggestedReplies: ['Accreditation', 'Ranking', 'Return to Main Menu'],
    },
    {
      message: '',
      type: 'image',
      imageUrl: 'assets/images/sfbu.webp',
      userTyped: false,
      isLoading: true,
      suggestedReplies: [],
    },
    {
      message: '',
      type: 'video',
      videoUrl: 'https://youtube.com/embed/AgOorOjaw2I?autoplay=1&v=AgOorOjaw2I',
      thumbNailUrl: 'assets/images/sfbu.webp',
      loadVideo: false,
      userTyped: false,
      isLoading: false,
      suggestedReplies: [],
    },
    {
      message: 'Thank you for contacting us. Let me know what can I help you with',
      type: 'text',
      userTyped: false,
      isLoading: true,
      suggestedReplies: [],
    },
    {
      message: 'I would love to connect you with my team. Please fill out this short form so they can follow up with you.',
      type: 'form',
      showForm: false,
      userTyped: false,
      isLoading: true,
      suggestedReplies: [],
    },
    {
      message: 'I would love to connect you with my team. Please fill out this short form so they can follow up with you.',
      type: 'carousel',
      images:[
        {
          path: 'assets/images/sfbu.webp',
          link: 'https://test.atlasrtx.com/next/webchat/tester?authId=C51DADFE78E14A1C94660E799AD71776&anon=1&backgroundURL=https:%2F%2Fci-static.atlasrtx.com%2Fpublic%2FAthena%2FUniversity_in_mountains.jpg',
          btntext: 'Apply',
          content:'Are you ready for one of the best computer science programs in California?'
        },
        {
          path: 'assets/images/building.jpeg',
          link: 'https://test.atlasrtx.com/next/webchat/tester?authId=C51DADFE78E14A1C94660E799AD71776&anon=1&backgroundURL=https:%2F%2Fci-static.atlasrtx.com%2Fpublic%2FAthena%2FUniversity_in_mountains.jpg',
          btntext: 'Fees',
          content:'Come to understand the interplay between business administration and IT'
        },
        {
          path: 'assets/images/sfbu.webp',
          link: 'https://test.atlasrtx.com/next/webchat/tester?authId=C51DADFE78E14A1C94660E799AD71776&anon=1&backgroundURL=https:%2F%2Fci-static.atlasrtx.com%2Fpublic%2FAthena%2FUniversity_in_mountains.jpg',
          btntext: 'Know More',
          content:'Are you ready for one of the best computer science programs in California?'    
        },
        {
          path: 'assets/images/students.webp',
          link: 'https://test.atlasrtx.com/next/webchat/tester?authId=C51DADFE78E14A1C94660E799AD71776&anon=1&backgroundURL=https:%2F%2Fci-static.atlasrtx.com%2Fpublic%2FAthena%2FUniversity_in_mountains.jpg',
          btntext: 'Programs',
          content:'Are you ready for one of the best computer science programs in California?'    
        } 
      ],
      userTyped: false,
      isLoading: false,
      suggestedReplies: [],
    },
    {
      message:'Thanks you, for providing your contact information. Have a great day ahead.',
      type: 'text',
      userTyped: false,
      isLoading: true,
      suggestedReplies: [],
    },
    {
      message: 'Thank you for your interest. Let me fetch the details for you',
      type: 'text',
      userTyped: false,
      isLoading: true,
      suggestedReplies: [],
    },
  ];

  constructor() {}

  startCoversation(): Observable<Message> {
    // Simulate the conversation's initial message from the chatbot
    // In the actual implementation, this method may make an HTTP request to get the initial message.
    return of(this.dummyMessages[0]);
  }

  getResponse(): Observable<Message> {
    // Simulate the chatbot's response to the user's message
    // In the actual implementation, this method may make an HTTP request to get the chatbot's response.

    // Generate a random index to select a random response from the dummyMessages array
    let index = Math.floor(Math.random() * 9);

    // Return the selected dummy message
    // The responses will not be relevant to the user message as 
    // these are just dummy messages to create the UI and the different elements
    return of(this.dummyMessages[index]);
  }

  sendUserDetails(userDetails: any) {
    // This method logs the user's details received from the Contact us form.
    // In the actual implementation, you would send this data to the server for further processing.
    console.log(userDetails);
  }
}

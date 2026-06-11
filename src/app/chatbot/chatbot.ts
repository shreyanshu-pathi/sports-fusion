import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chatbot',
  imports: [FormsModule, MatIconModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.scss',
})
export class Chatbot {

  isChatOpen = false;
  userInput = '';
  messages = [
    {
      sender: 'bot',
      text: 'Hi, Welcome to Sports Fusion. How can I help you today?'
    }
  ];

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {

    if (!this.userInput.trim()) return;

    const ques = this.userInput;

    this.messages.push({
      sender: 'user',
      text: ques
    });

    this.userInput = '';

    let reply = ' Sorry, I could not understand.';

    const query = ques.toLowerCase();

    if (query.includes('tournament')) {
      reply = 'You can register for tournaments from activites page.';
    }
    else if (query.includes('court')) {
      reply = 'You can book courts from the Bookings page.';
    }
    else if (query.includes('contact')) {
      reply = 'If you have any queries related to the slot booking you can visit contact page, so that out team will get in touch with you.'
    }
    else if (query.includes('challenge')) {
      reply = 'Sports challenges can be found in the Challenges section.';
    }

    setTimeout(() => {
      this.messages.push({
        sender: 'bot',
        text: reply
      });
    }, 500);
  }
}

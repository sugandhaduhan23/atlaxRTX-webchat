import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConversationService } from '../services/conversation.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  // Output event emitter to notify the parent component to close the form
  // since the close button html is wriiten in parent component
  // keeping the code as modular as possible
  @Output() closeForm = new EventEmitter<void>();

  // FormGroup to manage the user details form and its validation
  userDetails!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private conversationService: ConversationService
  ) {}

  ngOnInit(): void {
    // Initialize the user details form with required form controls and validators
    this.userDetails = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required]],
    });
  }

  // Helper method to get easy access to the form controls for validation
  get f() {
    return this.userDetails.controls;
  }

  // Method to send the user details to the conversation service and close the form
  sendUserDetails() {
    this.conversationService.sendUserDetails(this.userDetails.value);
    // Emit the event to close the form in the parent component
    // when the user details are submitted
    this.closeForm.emit();
  }
}

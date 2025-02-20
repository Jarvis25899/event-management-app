import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { EventModel } from '../../models/event.model';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-edit-event',
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
  ],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.scss',
})
export class EditEventComponent implements OnInit {
  isEdit = false;
  eventForm!: FormGroup;
  eventId?: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private eventsService: EventsService
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEdit = true;
        this.eventId = +params['id'];
        const event = this.eventsService.getEvent(this.eventId);
        this.eventForm.patchValue(event as any);
      }
    });
  }

  submitForm() {
    if (!this.eventForm.valid) {
      return;
    }

    const eventData = this.eventForm.value;
    if (this.isEdit && this.eventId) {
      eventData.id = this.eventId;
      this.eventsService.updateEvent(eventData);
    } else {
      this.eventsService.addEvent(eventData);
    }

    this.router.navigate(['events']);
  }

  cancel() {
    this.router.navigate(['events']);
  }
}

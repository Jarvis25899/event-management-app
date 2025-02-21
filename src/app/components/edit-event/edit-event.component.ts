import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
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
    MatTimepickerModule,
    MatSlideToggleModule,
  ],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class EditEventComponent implements OnInit {
  isEdit = false;
  eventForm!: FormGroup;
  eventId?: number;
  timeInterval = 15;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private eventsService: EventsService
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      allDay: [false],
      startDate: ['', Validators.required],
      startTime: [''],
      endDate: ['', Validators.required],
      endTime: [''],
      location: ['', Validators.required],
      description: [''],
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

    this.eventForm.controls['startDate'].valueChanges.subscribe((value) => {
      this.eventForm.controls['startTime'].patchValue(
        new Date(value.getTime())
      );
    });

    this.eventForm.controls['endDate'].valueChanges.subscribe((value) => {
      this.eventForm.controls['endTime'].patchValue(new Date(value.getTime()));
    });
  }

  get isAllDayEvent() {
    return this.eventForm.value.allDay;
  }

  submitForm() {
    if (!this.eventForm.valid) {
      return;
    }

    const eventData = this.eventForm.value;
    eventData.startDate.setTime(eventData.startTime);
    eventData.endDate.setTime(eventData.endTime);

    if (eventData.allDay) {
      eventData.startDate.setHours(0, 0, 0, 0);
      eventData.endDate.setHours(23, 59, 59, 999);
      delete eventData.startTime;
      delete eventData.endTime;
    }

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

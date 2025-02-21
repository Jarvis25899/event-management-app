import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { EventModel } from '../../models/event.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-details',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatDividerModule,
  ],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
})
export class EventDetailsComponent implements OnInit {
  event?: EventModel;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.event = this.eventsService.getEvent(+params['id']);
      }
    });
  }

  get isSingleDayEvent() {
    if (this.event) {
      const startDate = new Date(this.event.startDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(this.event.endDate);
      endDate.setHours(0, 0, 0, 0);

      return startDate.getTime() === endDate.getTime();
    }

    return false;
  }

  get multiDayDateFormat() {
    return this.event?.allDay ? 'MMM d, y' : 'MMM d, y, h:mm a';
  }

  onEdit() {
    this.router.navigate(['events/edit', this.event?.id]);
  }

  onDelete() {
    if (this.event?.id) {
      this.eventsService.deleteEvent(this.event.id);
      this.router.navigate(['events']);
    }
  }

  onBack() {
    this.router.navigate(['events']);
  }
}

import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule, SlicePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { EventsService } from '../../services/events.service';
import { EventModel } from '../../models/event.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-list',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    RouterLink,
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent implements OnInit {
  searchTerm: string = '';
  events: EventModel[] = [];
  filteredEvents: EventModel[] = [];
  pageSize = 10;
  pageSizeOptions = [5, 10, 25];
  startIndex = 0;
  endIndex = 0;
  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe((events) => {
      this.events = events;
      this.filteredEvents = events;
      this.endIndex = this.filteredEvents.length;
    });
  }

  isSingleDayEvent(event: EventModel) {
    if (event) {
      const startDate = new Date(event.startDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(event.endDate);
      endDate.setHours(0, 0, 0, 0);

      return startDate.getTime() === endDate.getTime();
    }

    return false;
  }

  multiDayDateFormat(event: EventModel) {
    return event.allDay ? 'MMM d, y' : 'MMM d, y, h:mm a';
  }

  clearSearch() {
    this.searchTerm = '';
    this.filterEvents();
  }

  filterEvents() {
    const filter = this.searchTerm.toLowerCase();
    this.filteredEvents = this.events.filter(
      (e) =>
        e.title.toLowerCase()?.includes(filter) ||
        e.location.toLowerCase()?.includes(filter)
    );
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.startIndex = event.pageIndex * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;
  }
}

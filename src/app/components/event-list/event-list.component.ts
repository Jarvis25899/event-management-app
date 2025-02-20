import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
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
    RouterLink,
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent implements OnInit {
  searchTerm: string = '';
  events: EventModel[] = [];
  filteredEvents: EventModel[] = [];
  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe((events) => {
      this.events = events;
      this.filteredEvents = events;
    });
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
}

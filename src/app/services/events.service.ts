import { Injectable } from '@angular/core';
import { EventModel } from '../models/event.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private events: EventModel[] = [];
  private eventSubject = new BehaviorSubject<EventModel[]>([]);

  constructor() {
    this.addEvent({
      title: 'Test Event 1',
      description: 'Test Event 1 Description',
      location: 'Pune, India',
      date: new Date('2025-02-22'),
    });
  }

  getEvents() {
    return this.eventSubject.asObservable();
  }

  getEvent(id: number) {
    return this.events.find((event) => event.id === id);
  }

  addEvent(event: EventModel) {
    this.events.push({ ...event, id: this.events.length + 1 });
    this.eventSubject.next([...this.events]);
  }

  deleteEvent(id: number) {
    this.events = this.events.filter((event) => event.id !== id);
    this.eventSubject.next(this.events);
  }

  updateEvent(event: EventModel) {
    const existingEventIndex = this.events.findIndex((e) => e.id === event.id);
    if (existingEventIndex !== -1) {
      this.events[existingEventIndex] = { ...event };
      this.eventSubject.next(this.events);
    }
  }
}

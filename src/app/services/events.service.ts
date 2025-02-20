import { Injectable } from '@angular/core';
import { EventModel } from '../models/event.model';
import { BehaviorSubject } from 'rxjs';

const DUMMY_EVENTS = [
  {
    id: 1,
    title: 'Test Event 1',
    description: 'Test Event 2 Description',
    location: 'Pune, India',
    date: new Date('2025-02-22'),
  },
  {
    id: 2,
    title: 'Test Event 2',
    description: 'Test Event 2 Description',
    location: 'Banglore, India',
    date: new Date('2025-02-26'),
  },
  {
    id: 3,
    title: 'Test Event 3',
    description: 'Test Event 3 Description',
    location: 'Ahmedabad, India',
    date: new Date('2025-03-22'),
  },
  {
    id: 4,
    title: 'Test Event 4',
    description: 'Test Event 4 Description',
    location: 'Hydrabad, India',
    date: new Date('2025-03-02'),
  },
  {
    id: 5,
    title: 'Test Event 5',
    description: 'Test Event 5 Description',
    location: 'Newyork, US',
    date: new Date('2025-03-12'),
  },
];

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private events: EventModel[] = [];
  private eventSubject = new BehaviorSubject<EventModel[]>([]);

  constructor() {
    this.events.push(...DUMMY_EVENTS);
    this.eventSubject.next(this.events);
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

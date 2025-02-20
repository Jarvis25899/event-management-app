import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-calendar-view',
  imports: [FullCalendarModule],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.scss',
})
export class CalendarViewComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin],
    nowIndicator: true,
    events: [],
    headerToolbar: {
      left: 'title prev,next today',
      center: '',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    eventClick: this.handleEventClick.bind(this),
    buttonText: {
      today: 'Today',
      month: 'Month',
      week: 'Week',
    },
  };

  constructor(private router: Router, private eventsService: EventsService) {}

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe((events) => {
      this.calendarOptions.events = events.map((event) => ({
        id: event.id?.toString(),
        title: event.title,
        // start: event.date,
        date: event.date,
        allDay: true,
      }));
    });
  }

  handleEventClick(arg: EventClickArg) {
    const eventId = arg.event.id;
    if (eventId) {
      this.router.navigate(['/events/view', eventId]);
    }
  }
}

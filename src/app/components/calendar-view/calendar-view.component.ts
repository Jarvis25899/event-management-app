import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg, ViewApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listGridPlugin from '@fullcalendar/list';
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
    plugins: [dayGridPlugin, timeGridPlugin, listGridPlugin],
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
    windowResize: this.onWindowResize.bind(this),
  };

  constructor(private router: Router, private eventsService: EventsService) {}

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe((events) => {
      this.calendarOptions.events = events.map((event) => {
        const endDate = new Date(event.endDate);

        if (event.allDay) {
          endDate.setDate(endDate.getDate() + 1);
        }

        return {
          id: event.id?.toString(),
          title: event.title,
          start: event.startDate,
          end: endDate,
          allDay: event.allDay,
        };
      });
    });
  }

  onWindowResize(arg: { view: ViewApi }) {
    console.log(arg);
    if (window.innerWidth < 768) {
      arg.view.calendar.changeView('listMonth');
      this.calendarOptions.headerToolbar = {
        ...this.calendarOptions.headerToolbar,
        right: 'listMonth',
      };
    } else {
      if (arg.view.calendar.view.type === 'listMonth') {
        arg.view.calendar.changeView('dayGridMonth');
      }
      this.calendarOptions.headerToolbar = {
        ...this.calendarOptions.headerToolbar,
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      };
    }
  }

  handleEventClick(arg: EventClickArg) {
    const eventId = arg.event.id;
    if (eventId) {
      this.router.navigate(['/events/view', eventId]);
    }
  }
}

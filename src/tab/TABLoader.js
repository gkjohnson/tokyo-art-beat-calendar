import { CalendarEvent } from '../core/CalendarEvent.js';
import { dateToDay } from '../core/CSVGenerator.js';

function traverse( data, cb ) {

    if ( cb( data ) ) {

        return data;

    }

    for ( const key in data ) {

        const obj = data[ key ];
        const res = traverse( obj, cb );
        if ( res !== null ) {

            return res;

        }

    }

    return null;

}

function tabToCalendarEvent( e ) {

    const res = new CalendarEvent();
    res.subject = e.eventName + ' opens';
    res.startTime = new Date( e.scheduleStartsOn );
    res.endTime = new Date( e.scheduleStartsOn );
    res.allDay = true;

    res.description = `Runs from ${ e.scheduleStartsOn } to ${ e.scheduleEndsOn } at '${ e.venue.fields.fullName }'\n\n`;
    res.description = `Admission ${ e.venue.fields.admissionFee } yen`
    res.location = e.venue.fields.address;

    return res;

}

export class TABLoader {

    constructor() {

        this.english = true;

    }
    
    load() {

        return fetch( 'https://www.tokyoartbeat.com/_next/data/Y9bBY7-1sd9mQZDAcn0HT/en/events/orderBy/latest.json?q=orderBy&q=latest' )
            .then( res => res.json() )
            .then( json => {

                const events = traverse( json, o => {

                    return 'data' in o && 'paginator' in o;

                } ).data;

                return events.map( e => tabToCalendarEvent( e ) );

            } );

    }

}
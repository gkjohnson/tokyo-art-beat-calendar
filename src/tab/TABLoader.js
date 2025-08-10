import { CalendarEvent } from '../core/CalendarEvent.js';

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

    res.description = `**Description**\nRuns from ${ e.scheduleStartsOn } to ${ e.scheduleEndsOn }'\n\n`;
    res.description += `**Address**\n${ e.venue.fields.fullName }\n\n`;

    res.location = e.venue.fields.fullName;

    return res;

}

export class TABLoader {

    constructor() {

        this.english = true;

    }
    
    load( url ) {

        return fetch( url )
            .then( res => res.json() )
            .then( json => {

                const events = traverse( json, o => {

                    return 'data' in o && 'paginator' in o;

                } ).data;

                return events
                    .filter( e => ! ! e.scheduleStartsOn )
                    .map( e => tabToCalendarEvent( e ) );

            } );

    }

}
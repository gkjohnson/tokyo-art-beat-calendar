import puppeteer from 'puppeteer';

export class TABUrlRetriever {

    async load() {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setRequestInterception( true );

        let url = null;
        return new Promise( resolve => {

            page.on( 'request', request => {

                if ( /events\.json/.test( request.url() ) ) {

                    url = request.url();
                    resolve();

                } else {

                    request.continue();

                }

            } );

            page.goto( 'https://www.tokyoartbeat.com/en/events', {
                waitUntil: 'domcontentloaded',
                timeout: 5000
            } );

        } ).then( () => {

            return page.close();

        } ).then( () => {

            return browser.close();

        } ).then( () => {

            return url;

        } );

    }

}
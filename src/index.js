import { CSVGenerator } from './core/CSVGenerator.js';
import { ICSGenerator } from './core/ICSGenerator.js';
import { TABLoader } from './tab/TABLoader.js';

( async () => {

    const loader = new TABLoader();
    const results = await loader.load( 'https://www.tokyoartbeat.com/_next/data/OICSeXKMliEAJd-Er-5E2/en/events/orderBy/latest.json?q=orderBy&q=latest' );

    // const gen = new CSVGenerator();
    // console.log( gen.generate( results ) );

    const gen = new ICSGenerator();
    console.log( await gen.generate( results ) );

} )();
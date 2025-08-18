import { CSVGenerator } from './core/CSVGenerator.js';
import { ICSGenerator } from './core/ICSGenerator.js';
import { TABLoader } from './tab/TABLoader.js';
import { TABUrlRetriever } from './tab/TABUrlRetriever.js';

( async () => {

    // use the JST timezone when interpreting dates.
    process.env.TZ = 'Asia/Tokyo';

    const url = await new TABUrlRetriever().load();
    const results = await new TABLoader().load( url );

    // console.log( new CSVGenerator().generate( results ) );
    console.log( await new ICSGenerator().generate( results ) );

} )();
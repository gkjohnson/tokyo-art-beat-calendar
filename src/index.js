import { CSVGenerator } from './core/CSVGenerator.js';
import { ICSGenerator } from './core/ICSGenerator.js';
import { TABLoader } from './tab/TABLoader.js';
import { TABUrlRetriever } from './tab/TABUrlRetriever.js';

( async () => {

    const url = await new TABUrlRetriever().load();
    const results = await new TABLoader().load( url );

    // console.log( new CSVGenerator().generate( results ) );
    console.log( await new ICSGenerator().generate( results ) );

} )();
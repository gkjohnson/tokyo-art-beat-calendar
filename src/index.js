import { CSVGenerator } from './core/CSVGenerator.js';
import { TABLoader } from './tab/TABLoader.js';

( async () => {

    const loader = new TABLoader();
    const results = await loader.load();
    const gen = new CSVGenerator();
    console.log( gen.generate( results ) );


} )();
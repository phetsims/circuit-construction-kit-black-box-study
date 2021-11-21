// Copyright 2016-2020, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import circuitConstructionKitBlackBoxStudyStrings from './circuitConstructionKitBlackBoxStudyStrings.js';
import ExploreScreen from './explore/ExploreScreen.js';

// constants
const TANDEM = Tandem.ROOT;

const circuitConstructionKitBlackBoxStudyTitleString = circuitConstructionKitBlackBoxStudyStrings[ 'circuit-construction-kit-black-box-study' ].title;

const simOptions = {
  credits: {
    leadDesign: 'Amy Rouinfar',
    softwareDevelopment: 'Sam Reid',
    team: 'Michael Dubson, Ariel Paul, Kathy Perkins',
    qualityAssurance: 'Steele Dalton, Bryce Griebenow, Elise Morgan, Ben Roberts',
    graphicArts: 'Bryce Gruneich'
  }
};

// Circuit Construction Kit has unit tests for checking the mathematics for the Modified Nodal Analysis
// algorithm.  In order to load the classes into an accessible namespace, the *-config.js and *-main.js are loaded
// however, when running the unit tests we don't also want to launch the simulation.
if ( !window.circuitConstructionKitTestSuite ) {
  simLauncher.launch( () => {
    const sim = new Sim( circuitConstructionKitBlackBoxStudyTitleString, [
      new ExploreScreen( TANDEM.createTandem( 'exploreScreen' ) )
      // new BlackBoxScreen( TANDEM.createTandem( 'blackBoxScreen' ) )
    ], simOptions );
    sim.start();
  } );
}
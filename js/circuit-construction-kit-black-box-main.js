// Copyright 2015-2016, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var ExploreScreen = require( 'CIRCUIT_CONSTRUCTION_KIT/explore/ExploreScreen' );
  var BlackBoxScreen = require( 'CIRCUIT_CONSTRUCTION_KIT/blackbox/BlackBoxScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Tandem = require( 'TANDEM/Tandem' );

  // If running as phet-io, load the API
  require( 'ifphetio!PHET_IO/simulations/circuit-construction-kit-black-box/circuit-construction-kit-black-box-api' );

  // constants
  var tandem = Tandem.createRootTandem();

  // strings
  var circuitConstructionKitBlackBoxTitleString = require( 'string!CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX/circuit-construction-kit-black-box.title' );

  var simOptions = {
    credits: {
      leadDesign: 'Amy Rouinfar',
      softwareDevelopment: 'Sam Reid',
      team: 'Michael Dubson, Ariel Paul, Kathy Perkins',
      qualityAssurance: 'Steele Dalton, Bryce Griebenow, Elise Morgan, Ben Roberts',
      graphicArts: 'Bryce Gruneich'
    },
    tandem: tandem
  };

  // Appending '?dev' to the URL will enable developer-only features.
  if ( phet.chipper.getQueryParameter( 'dev' ) ) {
    simOptions = _.extend( {
      // add dev-specific options here
    }, simOptions );
  }

  // Circuit Construction Kit has unit tests for checking the mathematics for the Modified Nodal Analysis
  // algorithm.  In order to load the classes into an accessible namespace, the *-config.js and *-main.js are loaded
  // however, when running the unit tests we don't also want to launch the simulation.
  if ( !window.circuitConstructionKitTestSuite ) {
    SimLauncher.launch( function() {
      var sim = new Sim( circuitConstructionKitBlackBoxTitleString, [
        new ExploreScreen( tandem.createTandem( 'exploreScreen' ) ),
        new BlackBoxScreen( tandem.createTandem( 'blackBoxScreen' ) )
      ], simOptions );
      sim.start();
    } );
  }
} );
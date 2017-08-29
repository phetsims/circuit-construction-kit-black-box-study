// Copyright 2015-2016, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var ExploreScreen = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/explore/ExploreScreen' );
  var BlackBoxScreen = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/BlackBoxScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Tandem = require( 'TANDEM/Tandem' );

  // constants
  var TANDEM = Tandem.createRootTandem();

  // strings
  var circuitConstructionKitBlackBoxStudyTitleString = require( 'string!CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuit-construction-kit-black-box-study.title' );

  var simOptions = {
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
    SimLauncher.launch( function() {
      var sim = new Sim( circuitConstructionKitBlackBoxStudyTitleString, [
        new ExploreScreen( TANDEM.createTandem( 'exploreScreen' ) ),
        new BlackBoxScreen( TANDEM.createTandem( 'blackBoxScreen' ) )
      ], simOptions );
      sim.start();
    } );
  }
} );
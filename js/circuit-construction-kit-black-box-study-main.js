// Copyright 2016-2017, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const BlackBoxScreen = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/BlackBoxScreen' );
  const ExploreScreen = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/explore/ExploreScreen' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const Tandem = require( 'TANDEM/Tandem' );

  // constants
  const TANDEM = Tandem.rootTandem;

  // strings
  const circuitConstructionKitBlackBoxStudyTitleString = require( 'string!CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuit-construction-kit-black-box-study.title' );

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
    SimLauncher.launch( () => {
      const sim = new Sim( circuitConstructionKitBlackBoxStudyTitleString, [
        new ExploreScreen( TANDEM.createTandem( 'exploreScreen' ) ),
        new BlackBoxScreen( TANDEM.createTandem( 'blackBoxScreen' ) )
      ], simOptions );
      sim.start();
    } );
  }
} );
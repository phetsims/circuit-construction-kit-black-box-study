// Copyright 2017-2019, University of Colorado Boulder

/**
 * Query parameters used in sim-specific code.
 *
 * @author Sam Reid
 */
define( require => {
  'use strict';

  // modules
  const circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );

  const BlackBoxQueryParameters = QueryStringMachine.getAll( {

    // Determines whether the black box reveal buttons will be shown.
    showRevealButton: { type: 'boolean', defaultValue: true }
  } );

  circuitConstructionKitBlackBoxStudy.register( 'BlackBoxQueryParameters', BlackBoxQueryParameters );

  return BlackBoxQueryParameters;
} );

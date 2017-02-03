// Copyright 2017, University of Colorado Boulder

/**
 * Query parameters used in sim-specific code.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );

  var BlackBoxQueryParameters = QueryStringMachine.getAll( {

    // Determines whether the black box reveal buttons will be shown.
    showRevealButton: { type: 'boolean', defaultValue: true }
  } );

  circuitConstructionKitBlackBoxStudy.register( 'BlackBoxQueryParameters', BlackBoxQueryParameters );

  return BlackBoxQueryParameters;
} );

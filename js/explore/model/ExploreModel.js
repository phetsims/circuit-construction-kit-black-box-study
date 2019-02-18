// Copyright 2017-2019, University of Colorado Boulder

/**
 * Model for the Explore Screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  const CircuitConstructionKitModel = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/model/CircuitConstructionKitModel' );

  class ExploreModel extends CircuitConstructionKitModel {
    constructor( tandem ) {
      super( tandem, { blackBoxStudy: true } );
    }
  }

  return circuitConstructionKitBlackBoxStudy.register( 'ExploreModel', ExploreModel );
} );
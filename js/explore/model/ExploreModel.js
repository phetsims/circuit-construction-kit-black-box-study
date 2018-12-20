// Copyright 2017, University of Colorado Boulder

/**
 * Model for the Explore Screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  var CircuitConstructionKitModel = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/model/CircuitConstructionKitModel' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   */
  function ExploreModel( tandem ) {
    CircuitConstructionKitModel.call( this, tandem, { blackBoxStudy: true } );
  }

  circuitConstructionKitBlackBoxStudy.register( 'ExploreModel', ExploreModel );

  return inherit( CircuitConstructionKitModel, ExploreModel );
} );
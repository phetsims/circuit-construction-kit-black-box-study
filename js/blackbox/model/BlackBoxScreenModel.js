// Copyright 2016-2018, University of Colorado Boulder

/**
 * This model is solely responsible for choosing between different scenes, one for each black box.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  var inherit = require( 'PHET_CORE/inherit' );
  var StringProperty = require( 'AXON/StringProperty' );

  /**
   * @constructor
   */
  function BlackBoxScreenModel() {

    // @public - indicates which scene is selected: warmup/scene0-scene14
    this.sceneProperty = new StringProperty( 'warmup' );
  }

  circuitConstructionKitBlackBoxStudy.register( 'BlackBoxScreenModel', BlackBoxScreenModel );

  return inherit( Object, BlackBoxScreenModel );
} );
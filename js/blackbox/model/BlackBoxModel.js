// Copyright 2016-2019, University of Colorado Boulder

/**
 * This model is solely responsible for choosing between different scenes, one for each black box.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  const StringProperty = require( 'AXON/StringProperty' );

  class BlackBoxModel {
    constructor() {

      // @public - indicates which scene is selected: warmup/scene0-scene14
      this.sceneProperty = new StringProperty( 'warmup' );
    }
  }

  return circuitConstructionKitBlackBoxStudy.register( 'BlackBoxModel', BlackBoxModel );
} );
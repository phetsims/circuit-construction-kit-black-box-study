// Copyright 2015-2016, University of Colorado Boulder
// TODO: Review, document, annotate, i18n, bring up to standards

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
    this.sceneProperty = new StringProperty( 'warmup' );
    Object.defineProperty( this, 'scene', this.sceneProperty.getDeclarator() );
  }

  circuitConstructionKitBlackBoxStudy.register( 'BlackBoxScreenModel', BlackBoxScreenModel );
  return inherit( Object, BlackBoxScreenModel );
} );
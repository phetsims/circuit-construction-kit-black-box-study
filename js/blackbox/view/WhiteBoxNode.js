// Copyright 2016-2019, University of Colorado Boulder
// TODO: Review, document, annotate, i18n, bring up to standards

/**
 * Shows an empty box for 'Test' mode.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const CCKCConstants = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/CCKCConstants' );

  class WhiteBoxNode extends Node {
    constructor( width, height, options ) {
      super( {
        children: [
          new Rectangle( 0, 0, width, height, 20, 20, {
            stroke: 'black',
            lineWidth: 3,
            fill: CCKCConstants.BACKGROUND_COLOR
          } )
        ]
      } );
      this.mutate( options );
    }
  }

  return circuitConstructionKitBlackBoxStudy.register( 'WhiteBoxNode', WhiteBoxNode );
} );
// Copyright 2016, University of Colorado Boulder
// TODO: Review, document, annotate, i18n, bring up to standards

/**
 * Shows an empty box for 'Test' mode.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var CCKCConstants =
    require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/CCKCConstants' );

  function WhiteBoxNode( width, height, options ) {
    Node.call( this, {
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

  circuitConstructionKitBlackBoxStudy.register( 'WhiteBoxNode', WhiteBoxNode );

  return inherit( Node, WhiteBoxNode );
} );
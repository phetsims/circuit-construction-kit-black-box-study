// Copyright 2016, University of Colorado Boulder

/**
 * The node that shows the black round rectangle with a question mark.
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
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {number} width - the width of the black box in view coordinates
   * @param {number} height - the height of the black box in view coordinates
   * @param {Property.<boolean>} revealingProperty - true if the user is pressing the "reveal" button
   * @param {Object} [options]
   * @constructor
   */
  function BlackBoxNode( width, height, revealingProperty, options ) {

    // TODO: i18n
    var questionMarkTextNode = new Text( '?', {
      fontSize: 82,
      centerX: width / 2,
      centerY: height / 2,
      fill: 'white'
    } );

    // Show the question mark if and only if the reveal button is not being pressed.
    revealingProperty.link( function( revealing ) {
      questionMarkTextNode.visible = !revealing;
    } );

    Node.call( this, {

      // Don't let clicks go through the black box
      pickable: true,

      children: [
        new Rectangle( 0, 0, width, height, 20, 20, {
          fill: 'black',
          opacity: phet.chipper.queryParameters.dev ? 0.2 : 1
        } ),
        questionMarkTextNode
      ]
    } );
    this.mutate( options );
  }

  circuitConstructionKitBlackBoxStudy.register( 'BlackBoxNode', BlackBoxNode );

  return inherit( Node, BlackBoxNode );
} );
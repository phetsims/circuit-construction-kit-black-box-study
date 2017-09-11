// Copyright 2016, University of Colorado Boulder

/**
 * A press-and-hold button that shows the true black box circuit.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RoundMomentaryButton = require( 'SUN/buttons/RoundMomentaryButton' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  var LIGHT_GREEN = '#91e053';
  var MIN_MARGIN = 15;

  /**
   * @param {BooleanProperty} revealingProperty - true if the user is revealing the true black box circuit
   * @param {BooleanProperty} enabledProperty - true if the reveal button is enabled (when the user attaches a component
   *                                          - to the interior of the black box)
   * @param {Tandem} tandem
   * @constructor
   */
  function RevealButton( revealingProperty, enabledProperty, tandem ) {
    RoundMomentaryButton.call( this, false, true, revealingProperty, {
      tandem: tandem,
      baseColor: 'yellow',
      minXMargin: MIN_MARGIN,
      minYMargin: MIN_MARGIN,
      content: new VBox( {
        spacing: 5,
        children: [
          new FontAwesomeNode( 'eye_open', { scale: 0.75 } ),
          new Text( 'Reveal', { fontSize: 15 } )
        ]
      } )
    } );
    enabledProperty.linkAttribute( this, 'enabled' );

    var self = this;
    revealingProperty.link( function( revealing ) {
      self.setBaseColor( revealing ? LIGHT_GREEN : 'yellow' ); // Light green
    } );
  }

  circuitConstructionKitBlackBoxStudy.register( 'RevealButton', RevealButton );

  return inherit( RoundMomentaryButton, RevealButton );
} );
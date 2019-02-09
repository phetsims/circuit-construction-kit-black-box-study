// Copyright 2016-2017, University of Colorado Boulder

/**
 * A press-and-hold button that shows the true black box circuit.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  const FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  const RoundMomentaryButton = require( 'SUN/buttons/RoundMomentaryButton' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  const LIGHT_GREEN = '#91e053';
  const MIN_MARGIN = 15;

  class RevealButton extends RoundMomentaryButton {

    /**
     * @param {BooleanProperty} revealingProperty - true if the user is revealing the true black box circuit
     * @param {BooleanProperty} enabledProperty - true if the reveal button is enabled (when the user attaches a component
     *                                          - to the interior of the black box)
     * @param {Tandem} tandem
     */
    constructor( revealingProperty, enabledProperty, tandem ) {
      super( false, true, revealingProperty, {
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

      const self = this;
      revealingProperty.link( revealing => self.setBaseColor( revealing ? LIGHT_GREEN : 'yellow' ) );
    }
  }

  return circuitConstructionKitBlackBoxStudy.register( 'RevealButton', RevealButton );
} );
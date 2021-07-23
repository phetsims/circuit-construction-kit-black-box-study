// Copyright 2016-2021, University of Colorado Boulder

/**
 * A press-and-hold button that shows the true black box circuit.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Path from '../../../../scenery/js/nodes/Path.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import eyeRegularShape from '../../../../sherpa/js/fontawesome-5/eyeRegularShape.js';
import RoundMomentaryButton from '../../../../sun/js/buttons/RoundMomentaryButton.js';
import circuitConstructionKitBlackBoxStudy from '../../circuitConstructionKitBlackBoxStudy.js';

// constants
const LIGHT_GREEN = '#91e053';
const MARGIN = 15;

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
      xMargin: MARGIN,
      yMargin: MARGIN,
      content: new VBox( {
        spacing: 5,
        children: [
          new Path( eyeRegularShape, { fill: 'black', maxWidth: 33.6 } ),
          new Text( 'Reveal', { fontSize: 15 } )
        ]
      } )
    } );
    enabledProperty.linkAttribute( this, 'enabled' );

    const self = this;
    revealingProperty.link( revealing => self.setBaseColor( revealing ? LIGHT_GREEN : 'yellow' ) );
  }
}

circuitConstructionKitBlackBoxStudy.register( 'RevealButton', RevealButton );
export default RevealButton;
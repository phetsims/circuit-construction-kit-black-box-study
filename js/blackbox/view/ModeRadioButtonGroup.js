// Copyright 2016-2020, University of Colorado Boulder

/**
 * Radio buttons for choosing 'Explore' or 'Test'
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Circuit from '../../../../circuit-construction-kit-common/js/model/Circuit.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import RadioButtonGroup from '../../../../sun/js/buttons/RadioButtonGroup.js';
import circuitConstructionKitBlackBoxStudy from '../../circuitConstructionKitBlackBoxStudy.js';

// constants
const InteractionMode = Circuit.InteractionMode;

class ModeRadioButtonGroup extends RadioButtonGroup {

  /**
   * @param {Property.<string>} modeProperty - property that indicates which mode the black box simulation is in
   * @param tandem
   */
  constructor( modeProperty, tandem ) {
    const textOptions = { fontSize: 18 };
    super( modeProperty, [ {
      value: InteractionMode.EXPLORE,

      // TODO: i18n
      node: new Text( 'Explore', textOptions ),
      tandemName: 'investigateCircuitButton'
    }, {
      value: InteractionMode.TEST,

      // TODO: i18n
      node: new Text( 'Test', textOptions ),
      tandemName: 'buildCircuitButton'
    } ], {
      tandem: tandem.createTandem( 'ModeRadioButtonGroup' ),
      baseColor: 'white',
      buttonContentXMargin: 10,
      buttonContentYMargin: 15,
      selectedStroke: PhetColorScheme.RESET_ALL_BUTTON_BASE_COLOR,
      selectedLineWidth: 2.5
    } );
  }
}

circuitConstructionKitBlackBoxStudy.register( 'ModeRadioButtonGroup', ModeRadioButtonGroup );
export default ModeRadioButtonGroup;
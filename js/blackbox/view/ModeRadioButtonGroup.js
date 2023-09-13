// Copyright 2016-2023, University of Colorado Boulder

/**
 * Radio buttons for choosing 'Explore' or 'Test'
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import { Text } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import circuitConstructionKitBlackBoxStudy from '../../circuitConstructionKitBlackBoxStudy.js';

class ModeRadioButtonGroup extends RectangularRadioButtonGroup {

  /**
   * @param {Property.<string>} modeProperty - property that indicates which mode the black box simulation is in
   * @param tandem
   */
  constructor( modeProperty, tandem ) {
    const textOptions = { fontSize: 18 };
    super( modeProperty, [ {
      value: 'explore',

      // TODO: i18n https://github.com/phetsims/tasks/issues/1129
      node: new Text( 'Explore', textOptions ),
      tandemName: 'investigateCircuitRadioButton'
    }, {
      value: 'test',

      // TODO: i18n https://github.com/phetsims/tasks/issues/1129
      node: new Text( 'Test', textOptions ),
      tandemName: 'buildCircuitRadioButton'
    } ], {
      radioButtonOptions: {
        baseColor: 'white',
        xMargin: 10,
        yMargin: 15,
        buttonAppearanceStrategyOptions: {
          selectedStroke: PhetColorScheme.RESET_ALL_BUTTON_BASE_COLOR,
          selectedLineWidth: 2.5
        }
      },
      tandem: tandem.createTandem( 'ModeRadioButtonGroup' )
    } );
  }
}

circuitConstructionKitBlackBoxStudy.register( 'ModeRadioButtonGroup', ModeRadioButtonGroup );
export default ModeRadioButtonGroup;
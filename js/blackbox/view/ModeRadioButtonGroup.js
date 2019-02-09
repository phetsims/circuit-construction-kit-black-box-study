// Copyright 2016-2017, University of Colorado Boulder

/**
 * Radio buttons for choosing 'Explore' or 'Test'
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  const Circuit = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/model/Circuit' );
  const PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  const RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  const Text = require( 'SCENERY/nodes/Text' );

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

  return circuitConstructionKitBlackBoxStudy.register( 'ModeRadioButtonGroup', ModeRadioButtonGroup );
} );
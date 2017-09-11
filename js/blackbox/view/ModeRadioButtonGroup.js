// Copyright 2016, University of Colorado Boulder

/**
 * Radio buttons for choosing 'Explore' or 'Test'
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  var inherit = require( 'PHET_CORE/inherit' );
  var InteractionMode = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/model/InteractionMode' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {Property.<string>} modeProperty - property that indicates which mode the black box simulation is in
   * @param tandem
   * @constructor
   */
  function ModeRadioButtonGroup( modeProperty, tandem ) {
    var textOptions = { fontSize: 18 };
    RadioButtonGroup.call( this, modeProperty, [ {
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

  circuitConstructionKitBlackBoxStudy.register( 'ModeRadioButtonGroup', ModeRadioButtonGroup );

  return inherit( RadioButtonGroup, ModeRadioButtonGroup );
} );
// Copyright 2015-2016, University of Colorado Boulder
// TODO: Review, document, annotate, i18n, bring up to standards

/**
 * The 'Black Box' screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  var BlackBoxScreenModel = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/model/BlackBoxScreenModel' );
  var BlackBoxScreenView = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/view/BlackBoxScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var BlackBoxNode = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/view/BlackBoxNode' );
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var CircuitConstructionKitCommonConstants =
    require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/CircuitConstructionKitCommonConstants' );

  // constants
  var BACKGROUND_COLOR = CircuitConstructionKitCommonConstants.BACKGROUND_COLOR;

  /**
   * @constructor
   */
  function BlackBoxScreen( tandem ) {

    var icon = new Rectangle( 0, 0, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.width, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.height, {
      fill: BACKGROUND_COLOR
    } );
    var blackBoxNode = new BlackBoxNode( 220, 160, new BooleanProperty( true ) );
    blackBoxNode.mutate( {
      scale: icon.width / blackBoxNode.bounds.width / 2,
      centerX: icon.centerX,
      centerY: icon.centerY
    } );
    icon.addChild( blackBoxNode );

    var options = {
      name: 'Black Box', //TODO i18n
      homeScreenIcon: icon,
      tandem: tandem
    };

    Screen.call( this,
      function() {
        return new BlackBoxScreenModel( tandem.createTandem( 'model' ) );
      }, function( model ) {
        return new BlackBoxScreenView( model, tandem.createTandem( 'view' ) );
      },
      options );
  }

  circuitConstructionKitBlackBoxStudy.register( 'BlackBoxScreen', BlackBoxScreen );

  return inherit( Screen, BlackBoxScreen );
} );
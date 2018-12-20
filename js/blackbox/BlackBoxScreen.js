// Copyright 2016-2017, University of Colorado Boulder
// TODO: Review, document, annotate, i18n, bring up to standards

/**
 * The 'Black Box' screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var BlackBoxNode = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/view/BlackBoxNode' );
  var BlackBoxModel = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/model/BlackBoxModel' );
  var BlackBoxScreenView = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/view/BlackBoxScreenView' );
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );
  var CCKCConstants =
    require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/CCKCConstants' );

  // constants
  var BACKGROUND_COLOR = CCKCConstants.BACKGROUND_COLOR;

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
        return new BlackBoxModel( tandem.createTandem( 'model' ) );
      }, function( model ) {
        return new BlackBoxScreenView( model, tandem.createTandem( 'view' ) );
      },
      options );
  }

  circuitConstructionKitBlackBoxStudy.register( 'BlackBoxScreen', BlackBoxScreen );

  return inherit( Screen, BlackBoxScreen );
} );
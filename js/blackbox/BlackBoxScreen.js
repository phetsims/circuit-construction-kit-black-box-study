// Copyright 2016-2019, University of Colorado Boulder
// TODO: Review, document, annotate, i18n, bring up to standards

/**
 * The 'Black Box' screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const BlackBoxNode = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/view/BlackBoxNode' );
  const BlackBoxModel = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/model/BlackBoxModel' );
  const BlackBoxScreenView = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/view/BlackBoxScreenView' );
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Screen = require( 'JOIST/Screen' );
  const CCKCConstants = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/CCKCConstants' );

  // constants
  const BACKGROUND_COLOR = CCKCConstants.BACKGROUND_COLOR;

  class BlackBoxScreen extends Screen {

    constructor( tandem ) {

      const icon = new Rectangle( 0, 0, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.width, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.height, {
        fill: BACKGROUND_COLOR
      } );
      const blackBoxNode = new BlackBoxNode( 220, 160, new BooleanProperty( true ) );
      blackBoxNode.mutate( {
        scale: icon.width / blackBoxNode.bounds.width / 2,
        centerX: icon.centerX,
        centerY: icon.centerY
      } );
      icon.addChild( blackBoxNode );

      const options = {
        name: 'Black Box', //TODO i18n
        homeScreenIcon: icon,
        tandem: tandem,
        maxDT: CCKCConstants.MAX_DT
      };

      super(
        () => new BlackBoxModel( tandem.createTandem( 'model' ) ),
        model => new BlackBoxScreenView( model, tandem.createTandem( 'view' ) ),
        options );
    }
  }

  return circuitConstructionKitBlackBoxStudy.register( 'BlackBoxScreen', BlackBoxScreen );
} );
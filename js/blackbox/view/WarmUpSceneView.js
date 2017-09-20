// Copyright 2015-2016, University of Colorado Boulder
// TODO: Review, document, annotate, i18n, bring up to standards

/**
 * One scene focuses on one black box, and has a separate model + view because scenes are independent.
 * TODO: Combine this class with BlackBoxSceneView.  It will simplify usage in BlackBoxScreenView.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var BlackBoxSceneView = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/view/BlackBoxSceneView' );
  var circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  var inherit = require( 'PHET_CORE/inherit' );
  var InteractionMode = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/model/InteractionMode' );
  var MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  var Property = require( 'AXON/Property' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {number} blackBoxWidth
   * @param {number} blackBoxHeight
   * @param {BlackBoxSceneModel} blackBoxSceneModel
   * @param {Property.<string>} sceneProperty - for switching screens
   * @constructor
   */
  function WarmUpSceneView( blackBoxWidth, blackBoxHeight, blackBoxSceneModel, sceneProperty, tandem ) {
    BlackBoxSceneView.call( this, blackBoxWidth, blackBoxHeight, blackBoxSceneModel, sceneProperty, tandem );
    var textOptions = {
      fontSize: 34
    };

    // TODO: i18n
    var questionText = new MultiLineText( 'What circuit is\nin the black box?', _.extend( {
      centerX: ScreenView.DEFAULT_LAYOUT_BOUNDS.width / 2,
      top: ScreenView.DEFAULT_LAYOUT_BOUNDS.height / 6
    }, textOptions ) );
    Property.multilink( [ blackBoxSceneModel.modeProperty, blackBoxSceneModel.revealingProperty ], function( mode, revealing ) {
      questionText.visible = !revealing && mode === InteractionMode.EXPLORE;
    } );

    // TODO: i18n
    var tryToText = new MultiLineText( 'Build a circuit that\nbehaves the same way.', _.extend( {
      centerX: ScreenView.DEFAULT_LAYOUT_BOUNDS.width / 2,
      top: ScreenView.DEFAULT_LAYOUT_BOUNDS.height / 6
    }, textOptions ) );
    blackBoxSceneModel.modeProperty.link( function( mode ) {
      tryToText.visible = mode === InteractionMode.TEST;
    } );

    this.addChild( questionText );
    this.addChild( tryToText );

    // Let the circuit elements move in front of the text
    tryToText.moveToBack();
    questionText.moveToBack();
  }

  circuitConstructionKitBlackBoxStudy.register( 'WarmUpSceneView', WarmUpSceneView );
  return inherit( BlackBoxSceneView, WarmUpSceneView );
} );
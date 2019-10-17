// Copyright 2016-2019, University of Colorado Boulder
// TODO: Review, document, annotate, i18n, bring up to standards

/**
 * One scene focuses on one black box, and has a separate model + view because scenes are independent.
 * TODO: Combine this class with BlackBoxSceneView.  It will simplify usage in BlackBoxScreenView.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const BlackBoxSceneView = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/view/BlackBoxSceneView' );
  const Circuit = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/model/Circuit' );
  const circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  const merge = require( 'PHET_CORE/merge' );
  const MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  const Property = require( 'AXON/Property' );
  const ScreenView = require( 'JOIST/ScreenView' );

  // constants
  const InteractionMode = Circuit.InteractionMode;

  class WarmUpSceneView extends BlackBoxSceneView {

    /**
     * @param {number} blackBoxWidth
     * @param {number} blackBoxHeight
     * @param {BlackBoxSceneModel} blackBoxSceneModel
     * @param {Property.<string>} sceneProperty - for switching screens
     */
    constructor( blackBoxWidth, blackBoxHeight, blackBoxSceneModel, sceneProperty, tandem ) {
      super( blackBoxWidth, blackBoxHeight, blackBoxSceneModel, sceneProperty, tandem );
      const textOptions = {
        fontSize: 34
      };

      // TODO: i18n
      const questionText = new MultiLineText( 'What circuit is\nin the black box?', merge( {
        centerX: ScreenView.DEFAULT_LAYOUT_BOUNDS.width / 2,
        top: ScreenView.DEFAULT_LAYOUT_BOUNDS.height / 6
      }, textOptions ) );
      Property.multilink( [ blackBoxSceneModel.modeProperty, blackBoxSceneModel.revealingProperty ], ( mode, revealing ) => {
        questionText.visible = !revealing && mode === InteractionMode.EXPLORE;
      } );

      // TODO: i18n
      const tryToText = new MultiLineText( 'Build a circuit that\nbehaves the same way.', merge( {
        centerX: ScreenView.DEFAULT_LAYOUT_BOUNDS.width / 2,
        top: ScreenView.DEFAULT_LAYOUT_BOUNDS.height / 6
      }, textOptions ) );
      blackBoxSceneModel.modeProperty.link( mode => {
        tryToText.visible = mode === InteractionMode.TEST;
      } );

      this.addChild( questionText );
      this.addChild( tryToText );

      // Let the circuit elements move in front of the text
      tryToText.moveToBack();
      questionText.moveToBack();
    }
  }

  return circuitConstructionKitBlackBoxStudy.register( 'WarmUpSceneView', WarmUpSceneView );
} );
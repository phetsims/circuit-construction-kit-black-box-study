// Copyright 2016-2022, University of Colorado Boulder
// TODO: Review, document, annotate, i18n, bring up to standards

/**
 * One scene focuses on one black box, and has a separate model + view because scenes are independent.
 * TODO: Combine this class with BlackBoxSceneView.  It will simplify usage in BlackBoxScreenView.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import merge from '../../../../phet-core/js/merge.js';
import MultiLineText from '../../../../scenery-phet/js/MultiLineText.js';
import circuitConstructionKitBlackBoxStudy from '../../circuitConstructionKitBlackBoxStudy.js';
import BlackBoxSceneView from './BlackBoxSceneView.js';

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
    Multilink.multilink( [ blackBoxSceneModel.modeProperty, blackBoxSceneModel.revealingProperty ], ( mode, revealing ) => {
      questionText.visible = !revealing && mode === 'explore';
    } );

    // TODO: i18n
    const tryToText = new MultiLineText( 'Build a circuit that\nbehaves the same way.', merge( {
      centerX: ScreenView.DEFAULT_LAYOUT_BOUNDS.width / 2,
      top: ScreenView.DEFAULT_LAYOUT_BOUNDS.height / 6
    }, textOptions ) );
    blackBoxSceneModel.modeProperty.link( mode => {
      tryToText.visible = mode === 'test';
    } );

    this.addChild( questionText );
    this.addChild( tryToText );

    // Let the circuit elements move in front of the text
    tryToText.moveToBack();
    questionText.moveToBack();
  }
}

circuitConstructionKitBlackBoxStudy.register( 'WarmUpSceneView', WarmUpSceneView );
export default WarmUpSceneView;
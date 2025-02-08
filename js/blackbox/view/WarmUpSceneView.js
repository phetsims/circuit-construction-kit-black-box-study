// Copyright 2016-2025, University of Colorado Boulder
// TODO: Review, document, annotate, i18n, bring up to standards https://github.com/phetsims/tasks/issues/1129

/**
 * One scene focuses on one black box, and has a separate model + view because scenes are independent.
 * TODO: Combine this class with BlackBoxSceneView.  It will simplify usage in BlackBoxScreenView. https://github.com/phetsims/tasks/issues/1129
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import merge from '../../../../phet-core/js/merge.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
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

    // TODO: i18n https://github.com/phetsims/tasks/issues/1129
    const questionText = new RichText( 'What circuit is<br>in the black box?', merge( {
      align: 'center',
      centerX: ScreenView.DEFAULT_LAYOUT_BOUNDS.width / 2,
      top: ScreenView.DEFAULT_LAYOUT_BOUNDS.height / 6
    }, textOptions ) );
    Multilink.multilink( [ blackBoxSceneModel.modeProperty, blackBoxSceneModel.revealingProperty ], ( mode, revealing ) => {
      questionText.visible = !revealing && mode === 'explore';
    } );

    // TODO: i18n https://github.com/phetsims/tasks/issues/1129
    const tryToText = new RichText( 'Build a circuit that<n>behaves the same way.', merge( {
      align: 'center',
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
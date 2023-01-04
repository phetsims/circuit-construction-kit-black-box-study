// Copyright 2017-2022, University of Colorado Boulder

/**
 * The view for the Explore screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import CCKCScreenView from '../../../../circuit-construction-kit-common/js/view/CCKCScreenView.js';
import CCKCConstants from '../../../../circuit-construction-kit-common/js/CCKCConstants.js';
import CircuitElementToolFactory from '../../../../circuit-construction-kit-common/js/view/CircuitElementToolFactory.js';
import circuitConstructionKitBlackBoxStudy from '../../circuitConstructionKitBlackBoxStudy.js';

class ExploreScreenView extends CCKCScreenView {

  /**
   * @param {CircuitConstructionKitModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {
    const circuitElementToolFactory = new CircuitElementToolFactory(
      model.circuit,
      model.showLabelsProperty,
      model.viewTypeProperty,
      point => this.circuitLayerNode.globalToLocalPoint( point ),
      tandem.createTandem( 'circuitElementToolbox' ).createTandem( 'carousel' ).createTandem( 'circuitElementTools' )
    );

    // Tool nodes that appear on every screen. Pagination for the carousel, each page should begin with wire node
    const circuitElementToolNodes = [

      // This page is duplicated in the Lab Screen View
      circuitElementToolFactory.createWireToolNode(),
      circuitElementToolFactory.createRightBatteryToolNode(),
      circuitElementToolFactory.createLightBulbToolNode(),
      circuitElementToolFactory.createResistorToolNode(),
      circuitElementToolFactory.createSwitchToolNode(),

      circuitElementToolFactory.createWireToolNode(),
      circuitElementToolFactory.createDollarBillToolNode(),
      circuitElementToolFactory.createPaperClipToolNode(),
      circuitElementToolFactory.createCoinToolNode(),
      circuitElementToolFactory.createEraserToolNode(),

      circuitElementToolFactory.createWireToolNode(),
      circuitElementToolFactory.createPencilToolNode()
    ];
    super( model, circuitElementToolNodes, tandem, {
      blackBoxStudy: true,
      circuitElementToolboxOptions: { carouselScale: CCKCConstants.DC_CAROUSEL_SCALE }
    } );
  }
}

circuitConstructionKitBlackBoxStudy.register( 'ExploreScreenView', ExploreScreenView );
export default ExploreScreenView;
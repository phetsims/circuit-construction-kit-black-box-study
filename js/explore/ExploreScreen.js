// Copyright 2017-2019, University of Colorado Boulder
// TODO: Review, document, annotate, i18n, bring up to standards

/**
 * The "Explore Screen", used in both Black Box Study and DC simulations.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../axon/js/Property.js';
import CCKCConstants from '../../../circuit-construction-kit-common/js/CCKCConstants.js';
import Screen from '../../../joist/js/Screen.js';
import Rectangle from '../../../scenery/js/nodes/Rectangle.js';
import circuitConstructionKitBlackBoxStudy from '../circuitConstructionKitBlackBoxStudy.js';
import ExploreModel from './model/ExploreModel.js';
import ExploreScreenView from './view/ExploreScreenView.js';

class ExploreScreen extends Screen {
  constructor( tandem ) {

    const options = {
      name: 'Explore', //TODO i18n
      backgroundColorProperty: new Property( CCKCConstants.BACKGROUND_COLOR ),
      homeScreenIcon: new Rectangle( 0, 0, 548, 373, { fill: 'red' } ),
      tandem: tandem,
      maxDT: CCKCConstants.MAX_DT
    };

    super(
      () => new ExploreModel( tandem.createTandem( 'model' ) ),
      model => new ExploreScreenView( model, tandem.createTandem( 'view' ) ),
      options );
  }
}

circuitConstructionKitBlackBoxStudy.register( 'ExploreScreen', ExploreScreen );
export default ExploreScreen;
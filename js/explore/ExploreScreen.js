// Copyright 2017-2025, University of Colorado Boulder
// TODO: Review, document, annotate, i18n, bring up to standards https://github.com/phetsims/tasks/issues/1129

/**
 * The "Explore Screen", used in both Black Box Study and DC simulations.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../axon/js/Property.js';
import CCKCConstants from '../../../circuit-construction-kit-common/js/CCKCConstants.js';
import CCKCColors from '../../../circuit-construction-kit-common/js/view/CCKCColors.js';
import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import Rectangle from '../../../scenery/js/nodes/Rectangle.js';
import circuitConstructionKitBlackBoxStudy from '../circuitConstructionKitBlackBoxStudy.js';
import ExploreModel from './model/ExploreModel.js';
import ExploreScreenView from './view/ExploreScreenView.js';

class ExploreScreen extends Screen {
  constructor( tandem ) {

    const options = {
      name: new Property( 'Explore' ), //TODO i18n https://github.com/phetsims/tasks/issues/1129
      backgroundColorProperty: new Property( CCKCColors.screenBackgroundColorProperty ),
      homeScreenIcon: new ScreenIcon( new Rectangle( 0, 0, 548, 373, { fill: 'red' } ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
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
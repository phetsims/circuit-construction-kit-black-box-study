// Copyright 2017-2020, University of Colorado Boulder

/**
 * Model for the Explore Screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import CircuitConstructionKitModel from '../../../../circuit-construction-kit-common/js/model/CircuitConstructionKitModel.js';
import circuitConstructionKitBlackBoxStudy from '../../circuitConstructionKitBlackBoxStudy.js';

class ExploreModel extends CircuitConstructionKitModel {
  constructor( tandem ) {
    super( true, tandem, { blackBoxStudy: true } );
  }
}

circuitConstructionKitBlackBoxStudy.register( 'ExploreModel', ExploreModel );
export default ExploreModel;
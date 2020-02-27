// Copyright 2016-2019, University of Colorado Boulder
// TODO: Review, document, annotate, i18n, bring up to standards

/**
 * Shows an empty box for 'Test' mode.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import CCKCConstants from '../../../../circuit-construction-kit-common/js/CCKCConstants.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import circuitConstructionKitBlackBoxStudy from '../../circuitConstructionKitBlackBoxStudy.js';

class WhiteBoxNode extends Node {
  constructor( width, height, options ) {
    super( {
      children: [
        new Rectangle( 0, 0, width, height, 20, 20, {
          stroke: 'black',
          lineWidth: 3,
          fill: CCKCConstants.BACKGROUND_COLOR
        } )
      ]
    } );
    this.mutate( options );
  }
}

circuitConstructionKitBlackBoxStudy.register( 'WhiteBoxNode', WhiteBoxNode );
export default WhiteBoxNode;
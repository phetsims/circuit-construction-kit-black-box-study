// Copyright 2017-2019, University of Colorado Boulder
// TODO: Review, document, annotate, i18n, bring up to standards

/**
 * The "Explore Screen", used in both Black Box Study and DC simulations.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  const ExploreModel = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/explore/model/ExploreModel' );
  const ExploreScreenView = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/explore/view/ExploreScreenView' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Screen = require( 'JOIST/Screen' );
  const CCKCConstants = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/CCKCConstants' );
  const Property = require( 'AXON/Property' );

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

  return circuitConstructionKitBlackBoxStudy.register( 'ExploreScreen', ExploreScreen );
} );
// Copyright 2015-2016, University of Colorado Boulder
// TODO: Review, document, annotate, i18n, bring up to standards

/**
 * The "Explore Screen", used in both Black Box Study and DC simulations.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  var ExploreScreenModel = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/explore/model/ExploreScreenModel' );
  var ExploreScreenView = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/explore/view/ExploreScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );
  var CCKCConstants =
    require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/CCKCConstants' );
  var Property = require( 'AXON/Property' );

  /**
   * @constructor
   */
  function ExploreScreen( tandem ) {

    var options = {
      name: 'Explore', //TODO i18n
      backgroundColorProperty: new Property( CCKCConstants.BACKGROUND_COLOR ),
      homeScreenIcon: new Rectangle( 0, 0, 548, 373, { fill: 'red' } ),
      tandem: tandem
    };

    Screen.call( this,
      function() {
        return new ExploreScreenModel( tandem.createTandem( 'model' ) );
      },
      function( model ) {
        return new ExploreScreenView( model, tandem.createTandem( 'view' ) );
      },
      options );
  }

  circuitConstructionKitBlackBoxStudy.register( 'ExploreScreen', ExploreScreen );

  return inherit( Screen, ExploreScreen );
} );
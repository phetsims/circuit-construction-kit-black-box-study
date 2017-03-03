// Copyright 2015-2016, University of Colorado Boulder

/**
 * The view for the Explore screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  var inherit = require( 'PHET_CORE/inherit' );
  var CircuitConstructionKitScreenView = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/common/view/CircuitConstructionKitScreenView' );

  /**
   * @param {CircuitConstructionKitModel} circuitConstructionKitScreenModel
   * @param {Tandem} tandem
   * @constructor
   */
  function ExploreScreenView( circuitConstructionKitScreenModel, tandem ) {
    CircuitConstructionKitScreenView.call( this, circuitConstructionKitScreenModel, tandem, {
      numberOfLeftBatteriesInToolbox: 0, // Only show right-facing batteries.
      toolboxOrientation: 'vertical', // The toolbox should be vertical
      showResetAllButton: true // The reset all button should be shown.
    } );
  }

  circuitConstructionKitBlackBoxStudy.register( 'ExploreScreenView', ExploreScreenView );

  return inherit( CircuitConstructionKitScreenView, ExploreScreenView );
} );
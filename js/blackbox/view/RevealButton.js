// Copyright 2016, University of Colorado Boulder
// TODO: Review, document, annotate, i18n, bring up to standards

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RoundMomentaryButton = require( 'SUN/buttons/RoundMomentaryButton' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Text = require( 'SCENERY/nodes/Text' );
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );

  function RevealButton( revealingProperty, enabledProperty, tandem ) {

    RoundMomentaryButton.call( this, false, true, revealingProperty, {
      tandem: tandem,
      baseColor: 'yellow',
      minXMargin: 15,
      minYMargin: 15,
      content: new VBox( {
        spacing: 5,
        children: [
          new FontAwesomeNode( 'eye_open', { scale: 0.75 } ),
          new Text( 'Reveal', { fontSize: 15 } )
        ]
      } )
    } );
    enabledProperty.linkAttribute( this, 'enabled' );

    var self = this;
    revealingProperty.link( function( revealing ) {
      self.setBaseColor( revealing ? '#91e053' : 'yellow' ); // Light green
    } );
  }

  circuitConstructionKitBlackBoxStudy.register( 'RevealButton', RevealButton );

  return inherit( RoundMomentaryButton, RevealButton );
} );
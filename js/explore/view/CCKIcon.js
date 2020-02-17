// Copyright 2017-2019, University of Colorado Boulder

/**
 * Home screen/navigation bar icon that shows common circuit elements.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const CCKCConstants = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/CCKCConstants' );
  const circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  const CustomLightBulbNode = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/view/CustomLightBulbNode' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const Image = require( 'SCENERY/nodes/Image' );
  const merge = require( 'PHET_CORE/merge' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Property = require( 'AXON/Property' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Resistor = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/model/Resistor' );
  const ResistorNode = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/view/ResistorNode' );
  const Screen = require( 'JOIST/Screen' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vertex = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/model/Vertex' );
  const Wire = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/model/Wire' );
  const WireNode = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/view/WireNode' );

  // images
  const battery = require( 'image!CIRCUIT_CONSTRUCTION_KIT_COMMON/battery.png' );

  // constants
  const BACKGROUND_COLOR = CCKCConstants.BACKGROUND_COLOR;
  const ELEMENT_WIDTH = 50;

  class CCKIcon extends Rectangle {

    /**
     * @param {Tandem} tandem
     */
    constructor( tandem ) {

      super( 0, 0, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.width, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.height, {
        fill: BACKGROUND_COLOR
      } );

      const viewProperty = new Property( 'lifelike' );

      const wire = new Wire( new Vertex( new Vector2( 0, 0 ) ), new Vertex( new Vector2( 100, 0 ) ), new Property( 0 ), tandem.createTandem( 'wire' ) );
      const wireNode = new WireNode( null, null, wire, null, viewProperty, tandem.createTandem( 'wireIcon' ) );

      // Model element used to create the node
      const resistor = new Resistor( new Vertex( Vector2.ZERO ), new Vertex( new Vector2( CCKCConstants.RESISTOR_LENGTH, 0 ) ), tandem.createTandem( 'resistor' ) );

      const resistorNode = new ResistorNode( null, null, resistor, null, viewProperty, tandem.createTandem( 'resistorIcon' ), {
        icon: true
      } );

      const batteryNode = new Image( battery );

      const lightBulbNode = new CustomLightBulbNode( new NumberProperty( 0 ) );

      // icons should not be discoverable by assistive technology, and should not be focusable
      const a11yIconOptions = {
        tagName: null,
        focusable: false
      };

      resistorNode.mutate( merge( a11yIconOptions, { scale: ELEMENT_WIDTH / resistorNode.width * 0.75 } ) );
      wireNode.mutate( merge( a11yIconOptions, { scale: ELEMENT_WIDTH / wireNode.width * 0.7 } ) );
      batteryNode.mutate( merge( a11yIconOptions, { scale: ELEMENT_WIDTH / batteryNode.width } ) );
      lightBulbNode.mutate( merge( a11yIconOptions, { scale: ELEMENT_WIDTH / lightBulbNode.width / 2 } ) );
      const vBox = new VBox( {
        spacing: 20,
        children: [ new HBox( { spacing: 20, children: [ wireNode, resistorNode ] } ), new HBox( {
          spacing: 20,
          children: [ batteryNode, lightBulbNode ]
        } ) ]
      } );
      vBox.mutate( {
        scale: this.height / vBox.height * 0.8,
        center: this.center
      } );
      this.addChild( vBox );
    }
  }

  return circuitConstructionKitBlackBoxStudy.register( 'CCKIcon', CCKIcon );
} );
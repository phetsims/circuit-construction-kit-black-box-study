// Copyright 2017, University of Colorado Boulder

/**
 * Home screen/navigation bar icon that shows common circuit elements.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );
  var CircuitConstructionKitCommonConstants =
    require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/CircuitConstructionKitCommonConstants' );
  var CustomLightBulbNode = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/view/CustomLightBulbNode' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Image = require( 'SCENERY/nodes/Image' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Property = require( 'AXON/Property' );
  var Resistor = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/model/Resistor' );
  var ResistorNode = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/view/ResistorNode' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Vertex = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/model/Vertex' );
  var Wire = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/model/Wire' );
  var WireNode = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/view/WireNode' );

  // images
  var batteryMipmap = require( 'mipmap!CIRCUIT_CONSTRUCTION_KIT_COMMON/battery.png' );

  // constants
  var BACKGROUND_COLOR = CircuitConstructionKitCommonConstants.BACKGROUND_COLOR;
  var ELEMENT_WIDTH = 50;

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function CCKIcon( tandem ) {

    Rectangle.call( this, 0, 0, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.width, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.height, {
      fill: BACKGROUND_COLOR
    } );

    var viewProperty = new Property( 'lifelike' );

    var wire = new Wire( new Vertex( 0, 0 ), new Vertex( 100, 0 ), new Property( 0 ), tandem.createTandem( 'wire' ) );
    var wireNode = new WireNode( null, null, wire, null, viewProperty, tandem.createTandem( 'wireIcon' ) );

    // Model element used to create the node
    var resistor = new Resistor( new Vertex( 0, 0 ), new Vertex( CircuitConstructionKitCommonConstants.RESISTOR_LENGTH, 0 ), tandem.createTandem( 'resistor' ) );

    var resistorNode = new ResistorNode( null, null, resistor, null, viewProperty, tandem.createTandem( 'resistorIcon' ), {
      icon: true
    } );

    var batteryNode = new Image( batteryMipmap );

    var lightBulbNode = new CustomLightBulbNode( new NumberProperty( 0 ) );

    // icons should not be discoverable by assistive technology, and should not be focusable
    var a11yIconOptions = {
      tagName: null,
      focusable: false
    };

    resistorNode.mutate( _.extend( a11yIconOptions, { scale: ELEMENT_WIDTH / resistorNode.width * 0.75 } ) );
    wireNode.mutate( _.extend( a11yIconOptions, { scale: ELEMENT_WIDTH / wireNode.width * 0.7 } ) );
    batteryNode.mutate( _.extend( a11yIconOptions, { scale: ELEMENT_WIDTH / batteryNode.width } ) );
    lightBulbNode.mutate( _.extend( a11yIconOptions, { scale: ELEMENT_WIDTH / lightBulbNode.width / 2 } ) );
    var vBox = new VBox( {
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

  circuitConstructionKitBlackBoxStudy.register( 'CCKIcon', CCKIcon );

  return inherit( Rectangle, CCKIcon );
} );
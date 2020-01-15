// Copyright 2016-2019, University of Colorado Boulder
// TODO: Review, document, annotate, i18n, bring up to standards

/**
 * One scene focuses on one black box, and has a separate model + view because scenes are independent.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const BlackBoxNode = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/view/BlackBoxNode' );
  const BlackBoxQueryParameters = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/BlackBoxQueryParameters' );
  const CCKCConstants = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/CCKCConstants' );
  const CCKCScreenView = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/view/CCKCScreenView' );
  const ChallengeSet = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/model/ChallengeSet' );
  const Circuit = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/model/Circuit' );
  const circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  const CircuitElementToolFactory = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/view/CircuitElementToolFactory' );
  const ComboBox = require( 'SUN/ComboBox' );
  const ComboBoxItem = require( 'SUN/ComboBoxItem' );
  const ModeRadioButtonGroup = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/view/ModeRadioButtonGroup' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Property = require( 'AXON/Property' );
  const Resistor = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/model/Resistor' );
  const RevealButton = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/view/RevealButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const Text = require( 'SCENERY/nodes/Text' );
  const timer = require( 'AXON/timer' );
  const WhiteBoxNode = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/view/WhiteBoxNode' );

  // constants
  const InteractionMode = Circuit.InteractionMode;

  // constants
  // const FADED_COLOR = new Color( '#e3edfc' );
  // const SOLID_COLOR = CCKCConstants.BACKGROUND_COLOR;

  class BlackBoxSceneView extends CCKCScreenView {
    /**
     * @param {number} blackBoxWidth - the width of the black box in view coordinates
     * @param {number} blackBoxHeight - the height of the black box in view coordinates
     * @param {BlackBoxSceneModel} blackBoxSceneModel - the model for the scene to display
     * @param {Property.<string>} sceneProperty - for switching screens
     * @param {Tandem} tandem
     */
    constructor( blackBoxWidth, blackBoxHeight, blackBoxSceneModel, sceneProperty, tandem ) {

      const circuitElementToolFactory = new CircuitElementToolFactory( blackBoxSceneModel.circuit, blackBoxSceneModel.showLabelsProperty, blackBoxSceneModel.viewTypeProperty,
        point => this.circuitLayerNode.globalToLocalPoint( point ) );

      const wireToolNode = circuitElementToolFactory.createWireToolNode( 25, tandem.createTandem( 'wireToolNode' ) );

      // Tool nodes that appear on every screen. Pagination for the carousel, each page should begin with wire node
      const circuitElementToolNodes = [

        // This page is duplicated in the Lab Screen View
        wireToolNode,
        circuitElementToolFactory.createRightBatteryToolNode( 10, tandem.createTandem( 'rightBatteryToolNode' ) ),
        circuitElementToolFactory.createLightBulbToolNode( 10, tandem.createTandem( 'lightBulbToolNode' ) ),
        circuitElementToolFactory.createResistorToolNode( 10, Resistor.ResistorType.RESISTOR, tandem.createTandem( 'resistorToolNode' ) ),
        circuitElementToolFactory.createSwitchToolNode( 5, tandem.createTandem( 'switchToolNode' ) ),

        new Node( { children: [ wireToolNode ] } ), // Wire should appear at the top of each carousel page
        circuitElementToolFactory.createDollarBillToolNode( 1, tandem.createTandem( 'dollarBillToolNode' ) ),
        circuitElementToolFactory.createPaperClipToolNode( 1, tandem.createTandem( 'paperClipToolNode' ) ),
        circuitElementToolFactory.createCoinToolNode( 1, tandem.createTandem( 'coinToolNode' ) ),
        circuitElementToolFactory.createEraserToolNode( 1, tandem.createTandem( 'eraserToolNode' ) ),

        new Node( { children: [ wireToolNode ] } ),// Wire should appear at the top of each carousel page
        circuitElementToolFactory.createPencilToolNode( 1, tandem.createTandem( 'pencilToolNode' ) ),
        circuitElementToolFactory.createHandToolNode( 1, tandem.createTandem( 'handToolNode' ) ),
        circuitElementToolFactory.createDogToolNode( 1, tandem.createTandem( 'dogToolNode' ) )
      ];

      super( blackBoxSceneModel, circuitElementToolNodes, tandem, {
        toolboxOrientation: 'vertical',
        showResetAllButton: true,
        blackBoxStudy: true
      } );

      // Add 'Explore' and 'Test' radio buttons under the sensor toolbox
      const modeRadioButtonGroup = new ModeRadioButtonGroup( blackBoxSceneModel.modeProperty, tandem.createTandem( 'modeRadioButtonGroup' ) );
      this.addChild( modeRadioButtonGroup );

      const revealButton = new RevealButton(
        blackBoxSceneModel.revealingProperty,
        blackBoxSceneModel.isRevealEnabledProperty,
        tandem.createTandem( 'revealButton' )
      );

      // The reveal button can be hidden with a sim-specific query parameter
      if ( BlackBoxQueryParameters.showRevealButton ) {
        this.addChild( revealButton );
      }

      // Circuit components and ammeter/voltmeter should be in front of these controls
      modeRadioButtonGroup.moveToBack();
      revealButton.moveToBack();

      // Options for Text instances that will appear in the ComboBox
      const comboBoxTextOptions = {
        fontSize: 16
      };

      // A different ComboBox instance appears in each BlackBoxSceneView
      const elements = [ new ComboBoxItem(
        new Text( 'Warm-up', comboBoxTextOptions ), // TODO: i18n
        'warmup', {
          tandemName: 'warmup'
        } ) ];
      for ( let i = 0; i < ChallengeSet.challengeArray.length; i++ ) {
        elements.push( new ComboBoxItem(
          new Text( 'Black Box ' + ( i + 1 ), comboBoxTextOptions ), // TODO: i18n
          'scene' + i, {
            tandemName: 'scene' + i
          }
        ) );
      }
      // create a node to keep track of combo box popup menu
      const listParent = new Node();
      this.addChild( listParent );

      const sceneSelectionComboBox = new ComboBox( elements, sceneProperty, listParent, {
        xMargin: 12,
        yMargin: 10,
        cornerRadius: 6,
        tandem: tandem.createTandem( 'sceneSelectionComboBox' )
      } );
      this.addChild( sceneSelectionComboBox );

      // Layout when the screen view size changed
      this.visibleBoundsProperty.link( visibleBounds => {
        modeRadioButtonGroup.top = this.sensorToolbox.bottom + 20;
        modeRadioButtonGroup.right = this.sensorToolbox.right;

        revealButton.top = modeRadioButtonGroup.bottom + 10;
        revealButton.right = modeRadioButtonGroup.right;

        sceneSelectionComboBox.centerX = visibleBounds.centerX;
        sceneSelectionComboBox.top = visibleBounds.top + CCKCConstants.VERTICAL_MARGIN;
        listParent.left = sceneSelectionComboBox.left;
        listParent.top = sceneSelectionComboBox.bottom;
      } );

      const blackBoxNode = new BlackBoxNode( blackBoxWidth, blackBoxHeight, blackBoxSceneModel.revealingProperty, {

        // Assumes the default layout bounds are used
        center: ScreenView.DEFAULT_LAYOUT_BOUNDS.center
      } );

      // Expand the black box bounds so all of the black box vertices are inside the bounds, see #128
      blackBoxSceneModel.blackBoxBounds = blackBoxNode.bounds.dilated( 7 );
      blackBoxSceneModel.revealingProperty.link( revealing => {
        blackBoxNode.opacity = revealing ? 0.2 : 1.0;
      } );
      blackBoxSceneModel.modeProperty.link( mode => {
        blackBoxNode.visible = mode === InteractionMode.EXPLORE;
      } );

      const whiteBoxNode = new WhiteBoxNode( blackBoxWidth, blackBoxHeight, {

        // Assumes the default layout bounds are used
        centerX: ScreenView.DEFAULT_LAYOUT_BOUNDS.width / 2,
        centerY: ScreenView.DEFAULT_LAYOUT_BOUNDS.height / 2
      } );
      blackBoxSceneModel.modeProperty.link( mode => {
        whiteBoxNode.visible = mode === InteractionMode.TEST;
      } );

      // Interleave the black/white box node in the nodes, so things may go in front of it.
      this.circuitLayerNode.afterCircuitElementsLayer.addChild( blackBoxNode );

      // Store the black box node reference for help with layering
      this.circuitLayerNode.beforeCircuitElementsLayer.addChild( whiteBoxNode );

      // Update the layering of view objects when the mode changes
      Property.multilink( [ blackBoxSceneModel.modeProperty, blackBoxSceneModel.isValueDepictionEnabledProperty ], ( mode, isValueDepictionEnabled ) => {
        const isTestMode = mode === InteractionMode.TEST;

        // self.backgroundPlane.fill = !isValueDepictionEnabled ? 'gray' :
        //                             isTestMode ? FADED_COLOR :
        //                             SOLID_COLOR;
        if ( isTestMode ) {
          this.circuitElementToolbox.moveToFront();
        }
        else {

          // investigate mode - move black box circuit elements to the back so they won't appear in front of the black box
          // TODO: fix layering
        }
        whiteBoxNode.moveToBack();
      } );

      // @private - When reset, move the boxes in front of the black box circuit elements
      this.resetBlackBoxSceneView = () => {
        blackBoxNode.moveToFront();
        whiteBoxNode.moveToBack();
      };

      // When dropping an object in "build mode", its vertices should pop inside the black box, see #113
      // TODO: Let's move this to the model, and make the blackBoxNodeBounds available there.
      blackBoxSceneModel.circuit.vertexDroppedEmitter.addListener( vertex => {

        // Allow the wire drag event to complete so that the wire won't think it was released near another target
        // and attach to it, see #173
        timer.setTimeout( () => {

          // If the wire connected to a black box vertex, then it may no longer exist in the model. In this case there is
          // no need to move it inside the black box.
          if ( blackBoxSceneModel.circuit.vertexGroup.contains( vertex ) && blackBoxSceneModel.modeProperty.get() === InteractionMode.TEST ) {

            // Find all the vertices that must be translated into the box, translating wires
            ( () => {
              const vertices = blackBoxSceneModel.circuit.findAllConnectedVertices( vertex );
              const connectedToBlackBox = vertices.filter( v => v.blackBoxInterfaceProperty.get() ).length > 0;
              if ( !connectedToBlackBox ) {
                for ( let i = 0; i < vertices.length; i++ ) {
                  const vertexInGroup = vertices[ i ];

                  const closestPoint = blackBoxNode.bounds.eroded( 30 ).closestPointTo( vertexInGroup.positionProperty.get() );
                  const delta = closestPoint.minus( vertexInGroup.positionProperty.get() );

                  this.circuitLayerNode.translateVertexGroup( vertexInGroup, vertices, delta, null, [] );
                }
              }
            } )();

            // Find all the vertices that must be translated into the box, shrinking wires
            // TODO: Factor out
            ( () => {
              const vertices = blackBoxSceneModel.circuit.findAllFixedVertices( vertex );
              const connectedToBlackBox = vertices.filter( v => v.blackBoxInterfaceProperty.get() ).length > 0;
              if ( !connectedToBlackBox ) {
                for ( let i = 0; i < vertices.length; i++ ) {
                  const vertexInGroup = vertices[ i ];

                  const closestPoint = blackBoxNode.bounds.eroded( 30 ).closestPointTo( vertexInGroup.positionProperty.get() );
                  const delta = closestPoint.minus( vertexInGroup.positionProperty.get() );

                  this.circuitLayerNode.translateVertexGroup( vertexInGroup, vertices, delta, null, [] );
                }
              }
            } )();
          }
        }, 0 );
      } );
    }

    /**
     * Reset the BlackBoxSceneView
     * @public
     */
    reset() {
      super.reset();
      this.resetBlackBoxSceneView();
    }
  }

  return circuitConstructionKitBlackBoxStudy.register( 'BlackBoxSceneView', BlackBoxSceneView );
} );
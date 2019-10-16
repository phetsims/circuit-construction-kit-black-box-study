// Copyright 2016-2019, University of Colorado Boulder

/**
 * This screen view creates and delegates to the scene views, it does not show anything that is not in a scene.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const BlackBoxSceneModel = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/model/BlackBoxSceneModel' );
  const BlackBoxSceneView = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/view/BlackBoxSceneView' );
  const ChallengeSet = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/model/ChallengeSet' );
  const circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const WarmUpSceneView = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/view/WarmUpSceneView' );

  class BlackBoxScreenView extends ScreenView {

    /**
     * @param {BlackBoxModel} blackBoxScreenModel
     * @param {Tandem} tandem
     */
    constructor( blackBoxScreenModel, tandem ) {
      super();

      // @private - the model
      this.blackBoxScreenModel = blackBoxScreenModel;

      // @private - the scene views which will be populated when selected
      this.sceneViews = {};

      blackBoxScreenModel.sceneProperty.link( scene => {

        // Create the scene if it did not already exist
        if ( !this.sceneViews[ scene ] ) {

          // Use the same dimensions for every black box so the size doesn't indicate what could be inside, in view
          // coordinates
          const blackBoxWidth = 250;
          const blackBoxHeight = 250;

          if ( scene === 'warmup' ) {
            this.sceneViews[ scene ] = new WarmUpSceneView(
              blackBoxWidth,
              blackBoxHeight,
              new BlackBoxSceneModel( ChallengeSet.warmupCircuitStateObject, tandem.createTandem( scene + 'Model' ) ),
              blackBoxScreenModel.sceneProperty,
              tandem.createTandem( scene + 'SceneView' )
            );
          }
          else if ( scene.indexOf( 'scene' ) === 0 ) {
            const index = parseInt( scene.substring( 'scene'.length ), 10 );
            this.sceneViews[ scene ] = new BlackBoxSceneView(
              blackBoxWidth,
              blackBoxHeight,
              new BlackBoxSceneModel( ChallengeSet.challengeArray[ index ], tandem.createTandem( scene + 'Model' ) ),
              blackBoxScreenModel.sceneProperty,
              tandem.createTandem( scene + 'SceneView' )
            );
          }
          else {
            assert && assert( false, 'no model found' );
          }
        }

        // Update layout when the scene changes
        this.updateAllSceneLayouts && this.updateAllSceneLayouts();

        // Show the selected scene
        const sceneView = this.sceneViews[ scene ];
        this.children = [ sceneView ];

        // Fix the vertex layering.
        sceneView.model.circuit.vertexGroup.forEach( vertex => vertex.relayerEmitter.emit() );
      } );

      this.visibleBoundsProperty.link( visibleBounds => {

        // TODO: it seems odd to change this function each time the bounds change.  Perhaps factor out into a single function.
        this.updateAllSceneLayouts = () => {
          _.keys( this.sceneViews ).forEach(
            key => this.sceneViews[ key ].visibleBoundsProperty.set( visibleBounds.copy() )
          );
        };
        this.updateAllSceneLayouts();
      } );
    }

    /**
     * When the model clock ticks in Joist, send the clock tick to the selected scene.
     * @param {number} dt - in seconds
     */
    step( dt ) {
      this.sceneViews[ this.blackBoxScreenModel.sceneProperty.value ].model.step( dt );
    }
  }

  return circuitConstructionKitBlackBoxStudy.register( 'BlackBoxScreenView', BlackBoxScreenView );
} );

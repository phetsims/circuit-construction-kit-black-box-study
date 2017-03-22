// Copyright 2015-2016, University of Colorado Boulder

/**
 * This screen view creates and delegates to the scene views, it does not show anything that is not in a scene.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  var inherit = require( 'PHET_CORE/inherit' );
  var BlackBoxSceneView = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/view/BlackBoxSceneView' );
  var BlackBoxSceneModel = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/model/BlackBoxSceneModel' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var WarmUpSceneView = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/view/WarmUpSceneView' );
  var CircuitStruct = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/common/model/CircuitStruct' );
  var ChallengeSet = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/blackbox/model/ChallengeSet' );

  /**
   * @param {BlackBoxScreenModel} blackBoxScreenModel
   * @param {Tandem} tandem
   * @constructor
   */
  function BlackBoxScreenView( blackBoxScreenModel, tandem ) {
    ScreenView.call( this );
    var self = this;

    // @private - the model
    this.blackBoxScreenModel = blackBoxScreenModel;

    // @private - the scene views which will be populated when selected
    this.sceneViews = {};

    blackBoxScreenModel.sceneProperty.link( function( scene ) {

      // Create the scene if it did not already exist
      if ( !self.sceneViews[ scene ] ) {

        // Use the same dimensions for every black box so the size doesn't indicate what could be inside, in view
        // coordinates
        var blackBoxWidth = 250;
        var blackBoxHeight = 250;

        if ( scene === 'warmup' ) {
          self.sceneViews[ scene ] = new WarmUpSceneView(
            blackBoxWidth,
            blackBoxHeight,
            new BlackBoxSceneModel( ChallengeSet.warmupCircuitStateObject, tandem.createTandem( scene + 'Model' ) ),
            blackBoxScreenModel.sceneProperty,
            tandem.createTandem( scene + 'SceneView' )
          );
        }
        else if ( scene.indexOf( 'scene' ) === 0 ) {
          var index = parseInt( scene.substring( 'scene'.length ), 10 );
          self.sceneViews[ scene ] = new BlackBoxSceneView(
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
      self.updateAllSceneLayouts && self.updateAllSceneLayouts();

      // Show the selected scene
      var sceneView = self.sceneViews[ scene ];
      self.children = [ sceneView ];

      // Fix the vertex layering.
      sceneView.circuitConstructionKitModel.circuit.vertices.forEach( function( vertex ) {
        vertex.relayerEmitter.emit();
      } );
    } );

    this.visibleBoundsProperty.link( function( visibleBounds ) {

      // TODO: it seems odd to change this function each time the bounds change.  Perhaps factor out into a single function.
      self.updateAllSceneLayouts = function() {
        _.keys( self.sceneViews ).forEach( function( key ) {
          self.sceneViews[ key ].visibleBoundsProperty.set( visibleBounds.copy() );
        } );
      };
      self.updateAllSceneLayouts();
    } );
  }

  circuitConstructionKitBlackBoxStudy.register( 'BlackBoxScreenView', BlackBoxScreenView );

  return inherit( ScreenView, BlackBoxScreenView, {

    /**
     * When the model clock ticks in Joist, send the clock tick to the selected scene.
     * @param {number} dt - in seconds
     */
    step: function( dt ) {
      this.sceneViews[ this.blackBoxScreenModel.scene ].circuitConstructionKitModel.step( dt );
    }
  } );
} );
// Copyright 2015-2016, University of Colorado Boulder
// TODO: Review, document, annotate, i18n, bring up to standards

/**
 * One scene for the black box screen, which focuses on a single black box and deals with the contents of the
 * black box when the mode changes between investigate and build.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var circuitConstructionKitBlackBoxStudy = require( 'CIRCUIT_CONSTRUCTION_KIT_BLACK_BOX_STUDY/circuitConstructionKitBlackBoxStudy' );
  var CircuitConstructionKitModel = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/common/model/CircuitConstructionKitModel' );
  var CircuitStruct = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/common/model/CircuitStruct' );
  var Wire = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/common/model/Wire' );
  var Battery = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/common/model/Battery' );
  var Switch = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/common/model/Switch' );
  var Resistor = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/common/model/Resistor' );
  var LightBulb = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/common/model/LightBulb' );
  var Vertex = require( 'CIRCUIT_CONSTRUCTION_KIT_COMMON/common/model/Vertex' );
  var BooleanProperty = require( 'AXON/BooleanProperty' );

  /**
   * @param {CircuitStruct} trueBlackBoxCircuit - the circuit inside the black box (the true one, not the user-created one)
   * @param {Tandem} tandem
   * @constructor
   */
  function BlackBoxSceneModel( trueBlackBoxCircuit, tandem ) {
    assert && assert( trueBlackBoxCircuit instanceof CircuitStruct, 'circuit should be CircuitStruct' );
    var self = this;

    // When loading a black box circuit, none of the vertices should be draggable
    // TODO: Fix this in the saved/loaded data structures, not here as a post-hoc patch.
    for ( i = 0; i < trueBlackBoxCircuit.vertices.length; i++ ) {
      trueBlackBoxCircuit.vertices[ i ].draggableProperty.set( false );

      if ( trueBlackBoxCircuit.vertices[ i ].attachableProperty.get() ) {
        trueBlackBoxCircuit.vertices[ i ].blackBoxInterfaceProperty.set( true );
        //trueBlackBoxCircuit.vertices[ i ].attachableProperty.set( false );
      }
      else {
        trueBlackBoxCircuit.vertices[ i ].insideTrueBlackBoxProperty.set( true );
      }
    }

    // Add wire stubs outside the black box, see https://github.com/phetsims/circuit-construction-kit-black-box-study/issues/21
    // for ( var i = 0; i < trueBlackBoxCircuit.vertices.length; i++ ) {
    //   var vertex = trueBlackBoxCircuit.vertices[ i ];
    //   if ( vertex.blackBoxInterfaceProperty.get() ) {
    //     console.log( vertex.positionProperty.value );
    //
    //     // the center of the black box is approximately (508, 305).  Point the wires away from the box.
    //     var side = vertex.positionProperty.value.x < 400 ? 'left' :
    //                vertex.positionProperty.value.x > 600 ? 'right' :
    //                vertex.positionProperty.value.y < 200 ? 'top' :
    //                'bottom';
    //
    //     var extentLength = 40;
    //
    //     var dx = side === 'left' ? -extentLength :
    //              side === 'right' ? +extentLength :
    //              0;
    //     var dy = side === 'top' ? -extentLength :
    //              side === 'bottom' ? +extentLength :
    //              0;
    //     var outerVertex = new Vertex( vertex.positionProperty.value.x + dx, vertex.positionProperty.value.y + dy );
    //     outerVertex.attachableProperty.set( true );
    //     outerVertex.blackBoxInterfaceProperty.set( true );
    //     outerVertex.draggableProperty.set( false );
    //
    //     trueBlackBoxCircuit.wires.push( new Wire( vertex, outerVertex, 1E-6 ) ); // TODO: resistivity
    //   }
    // }

    // All of the circuit elements should be non-interactive
    // TODO: Fix this in the saved/loaded data structures, not here as a post-hoc patch.
    for ( var i = 0; i < trueBlackBoxCircuit.circuitElements.length; i++ ) {
      var circuitElement = trueBlackBoxCircuit.circuitElements[ i ];
      circuitElement.interactiveProperty.set( false );
      circuitElement.insideTrueBlackBoxProperty.set( true );
    }

    CircuitConstructionKitModel.call( this, tandem );

    // @public - true when the user is holding down the reveal button and the answer (inside the black box) is showing
    this.revealingProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'revealingProperty' )
    } );

    // @public - true if the user has created a circuit for comparison with the black box (1+ terminal connected)
    this.isRevealEnabledProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'isRevealEnabledProperty' )
    } );

    // For syntax highlighting and navigation
    this.circuit = this.circuit || null;

    // @public {Bounds2} - filled in by the BlackBoxSceneView after the black box node is created and positioned
    this.blackBoxBounds = null;

    // When reveal is pressed, true black box circuit should be shown instead of the user-created circuit
    this.revealingProperty.lazyLink( function( revealing ) {
      self.modeProperty.set( revealing ? 'explore' : 'test' );
    } );

    // Keep track of what the user has built inside the black box so it may be restored.
    var userBlackBoxCircuit = new CircuitStruct( [], [], [], [], [], [] );
    var circuit = this.circuit;


    var addWireStubs = function() {
      // Add wire stubs outside the black box, see https://github.com/phetsims/circuit-construction-kit-black-box-study/issues/21
      for ( i = 0; i < trueBlackBoxCircuit.vertices.length; i++ ) {
        var vertex = trueBlackBoxCircuit.vertices[ i ];
        if ( vertex.blackBoxInterfaceProperty.get() ) {
          vertex.blackBoxInterfaceProperty.set( false );

          // the center of the black box is approximately (508, 305).  Point the wires away from the box.
          var side = vertex.positionProperty.value.x < 400 ? 'left' :
                     vertex.positionProperty.value.x > 600 ? 'right' :
                     vertex.positionProperty.value.y < 200 ? 'top' :
                     'bottom';

          var extentLength = 40;

          var dx = side === 'left' ? -extentLength :
                   side === 'right' ? +extentLength :
                   0;
          var dy = side === 'top' ? -extentLength :
                   side === 'bottom' ? +extentLength :
                   0;
          var outerVertex = new Vertex( vertex.positionProperty.value.x + dx, vertex.positionProperty.value.y + dy );
          // outerVertex.attachable = true;
          outerVertex.blackBoxInterfaceProperty.set( true );
          outerVertex.draggableProperty.set( false );
          outerVertex.outerWireStub = true;
          vertex.blackBoxInterfaceProperty.set( true );

          var w = new Wire( vertex, outerVertex, 1E-6, { // TODO: resistivity
            wireStub: true,
            interactive: false
          } );
          circuit.circuitElements.push( w );
        }
      }
    };

    addWireStubs();

    /**
     * Check whether the user built (at least part of) their own black box circuit.
     * @returns {boolean}
     */
    var userBuiltSomething = function() {
      var count = 0;
      circuit.circuitElements.forEach( function( element ) {
        var isConnectedToBlackBoxInterface = element.startVertexProperty.get().blackBoxInterfaceProperty.get() || element.endVertexProperty.get().blackBoxInterfaceProperty.get();
        if ( element.interactiveProperty.get() && isConnectedToBlackBoxInterface ) {
          count++;
        }
      } );
      return count > 0;
    };

    // Enable the reveal button if the user has done something in build mode.
    circuit.circuitChangedEmitter.addListener( function() {
      var builtSomething = self.modeProperty.get() === 'test' && userBuiltSomething();
      self.isRevealEnabledProperty.set( self.revealingProperty.get() || builtSomething );
    } );

    /**
     * Remove the true black box contents or user-created black box contents
     * @param {CircuitStruct} blackBoxCircuit
     */
    var removeBlackBoxContents = function( blackBoxCircuit ) {
      circuit.circuitElements.removeAll( blackBoxCircuit.wires );
      circuit.circuitElements.removeAll( blackBoxCircuit.lightBulbs );
      circuit.circuitElements.removeAll( blackBoxCircuit.resistors );
      circuit.circuitElements.removeAll( blackBoxCircuit.batteries );

      // Remove the vertices but not those on the black box interface
      for ( var i = 0; i < blackBoxCircuit.vertices.length; i++ ) {
        var vertex = blackBoxCircuit.vertices[ i ];
        if ( !vertex.blackBoxInterfaceProperty.get() ) {
          circuit.vertices.remove( vertex );
        }
      }
    };

    /**
     * Add the true black box contents or user-created black box contents
     * @param {CircuitStruct} blackBoxCircuit
     */
    var addBlackBoxContents = function( blackBoxCircuit ) {

      circuit.circuitElements.addAll( blackBoxCircuit.wires );
      circuit.circuitElements.addAll( blackBoxCircuit.resistors );
      circuit.circuitElements.addAll( blackBoxCircuit.batteries );
      circuit.circuitElements.addAll( blackBoxCircuit.lightBulbs );

      blackBoxCircuit.circuitElements.forEach( function( circuitElement ) {
        circuitElement.moveToFrontEmitter.emit();
      } );
    };

    // Logic for changing the contents of the black box when the mode changes
    // TODO: All of this logic must be re-read and re-evaluated.
    this.modeProperty.link( function( mode ) {

      // When switching to 'test' mode, remove all of the black box circuitry and vice-versa
      if ( mode === 'test' ) {

        removeBlackBoxContents( trueBlackBoxCircuit );

        // Any draggable vertices that remain should be made unattachable and undraggable, so the user cannot update the
        // circuit outside the box
        circuit.vertices.forEach( function( vertex ) {
          if ( !vertex.blackBoxInterfaceProperty.get() ) {
            vertex.attachableProperty.set( false );
            vertex.draggableProperty.set( false );
            vertex.interactiveProperty.set( false );
          }
        } );
        circuit.circuitElements.forEach( function( circuitElement ) {
          circuitElement.interactiveProperty.set( false );
        } );
        addBlackBoxContents( userBlackBoxCircuit );
      }
      else {

        // Switched to 'explore'. Move interior elements to userBlackBoxCircuit
        userBlackBoxCircuit.clear();
        circuit.vertices.forEach( function( v ) { if ( v.interactiveProperty.get() && v.draggableProperty.get() ) {userBlackBoxCircuit.vertices.push( v );}} );
        circuit.circuitElements.forEach( function( circuitElement ) {
          if ( circuitElement.interactiveProperty.get() ) {

            // TODO: abstraction
            if ( circuitElement instanceof Wire ) {
              userBlackBoxCircuit.wires.push( circuitElement );
            }
            else if ( circuitElement instanceof Battery ) {
              userBlackBoxCircuit.batteries.push( circuitElement );
            }
            else if ( circuitElement instanceof LightBulb ) {
              userBlackBoxCircuit.lightBulbs.push( circuitElement );
            }
            else if ( circuitElement instanceof Resistor ) {
              userBlackBoxCircuit.resistors.push( circuitElement );
            }
            else if ( circuitElement instanceof Switch ) {
              userBlackBoxCircuit.switches.push( circuitElement );
            }
          }
        } );
        removeBlackBoxContents( userBlackBoxCircuit );

        // Any attachable vertices outside the box should become attachable and draggable
        circuit.vertices.forEach( function( vertex ) {
          if ( !vertex.blackBoxInterfaceProperty.get() ) {
            vertex.draggableProperty.set( true );
            vertex.attachableProperty.set( true );
            vertex.interactiveProperty.set( true );
          }
        } );
        circuit.circuitElements.forEach( function( circuitElement ) {
          if ( circuitElement.wireStub === true ) {
            // no nop, wire stubs remain non-interactive
          }
          else {
            circuitElement.interactiveProperty.set( true );
          }
        } );

        addBlackBoxContents( trueBlackBoxCircuit );
      }
      circuit.solve();
    } );

    // @private - called by reset
    this.resetBlackBoxSceneModel = function() {
      addWireStubs();
      addBlackBoxContents( trueBlackBoxCircuit );
      userBlackBoxCircuit.clear();
    };
  }

  circuitConstructionKitBlackBoxStudy.register( 'BlackBoxSceneModel', BlackBoxSceneModel );

  return inherit( CircuitConstructionKitModel, BlackBoxSceneModel, {

    /**
     * Reset the model.
     * @overrides
     * @public
     */
    reset: function() {
      CircuitConstructionKitModel.prototype.reset.call( this );
      // @public - whether the user is in the 'explore' or 'test' mode
      this.revealingProperty.reset();
      this.isRevealEnabledProperty.reset();
      this.resetBlackBoxSceneModel();
    }
  } );
} );
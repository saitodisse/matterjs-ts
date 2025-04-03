"use client";

import React, { useRef, useEffect } from 'react';
import Matter from 'matter-js';

const FallingObject = () => {
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scene.current) {
      
      // Module aliases
      const Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint;

      // Create an engine
      const engine = Engine.create();

      // Create a renderer
      const render = Render.create({
        element: scene.current,
        engine: engine,
        options: {
          width: 800,
          height: 600,
          wireframes: false,
        },
      });

      // Create a world
      const world = engine.world;

      // Create a rectangle body
      const box = Bodies.rectangle(400, 300, 80, 80);

      // Add the bodies to the world
      World.add(world, [box]);

      // Add mouse control
      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });

      World.add(world, mouseConstraint);

      // Keep the mouse in sync with rendering
      render.mouse = mouse;

      // Allow objects to fall on click
      Matter.Events.on(mouseConstraint, "mousedown", function(event) {
        if (event.mouse.element === render.canvas) {
          Matter.Body.setStatic(box, false);
        }
      });
      Matter.Body.setStatic(box, true); // Initialize as static

      // Run the engine
      Engine.run(engine);

      // Run the renderer
      Render.run(render);

      // Cleanup on unmount
      return () => {
        Render.stop(render);
        World.clear(world, false);
        Engine.clear(engine);
        render.canvas.remove();
      };
    }
  }, []);

  return <div ref={scene} />;
};

export default FallingObject;
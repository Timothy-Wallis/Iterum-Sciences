// src/engine/index.ts

import Camera from './Camera';
import Canvas from './Canvas';
import Engine from './Engine';
import Entity from './Entity';
import EntityManager from './EntityManager';
import TextureManager from './TextureManager';
import {UnitVec2} from './Vec2';
import Vec2 from './Vec2';
import Lerp from './LinearInterpolation.ts'

// Declare using let as a standard object variable
let CTXEngine = {
  Camera,
  Canvas,
  Engine,
  Entity,
  EntityManager,
  TextureManager,
  UnitVec2,
  Vec2,
  Lerp
};

// Export the variable out to your system
export { CTXEngine };

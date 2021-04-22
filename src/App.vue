<template>
  <div class="app">
    <Canvas :shapes="zippedShapes" ref="canvas" />
    <div>
      <ShapeForm @submit="onNewShape" />
      <div>
        <span>Mode de transformation&nbsp;:&nbsp;</span>
        <input type="radio" value="normal" id="normal" v-model="mode" />
        <label for="normal">Normal</label>
        <input type="radio" value="parallel" id="parallel" v-model="mode" />
        <label for="parallel">Parallel</label>
      </div>

      <button type="button" @click="transformCircles">
        Transformer les cercles en rectangles
      </button>
      <button type="button" @click="filterRectangles">
        Filtrer les rectangles
      </button>
      <button type="button" @click="filterCircles">Filtrer les cerlces</button>
      <button type="button" @click="zipShapes">Restaurer</button>
    </div>
  </div>
</template>

<script>
import Canvas from "./components/Canvas.vue"
import ShapeForm from "./components/ShapeForm.vue"
import {
  circlesToRectangles,
  circlesToRectanglesAsync,
  getCircles,
  getRectangles,
  zip,
} from "./shape"

export default {
  name: "App",
  components: {
    Canvas,
    ShapeForm,
  },
  data() {
    ShapeForm
    return {
      shapes: {
        x: [],
        y: [],
        width: [],
        height: [],
        color: [],
        type: [],
      },
      mode: "normal",
      zippedShapes: [],
    }
  },
  methods: {
    onNewShape(shape) {
      this.shapes.x.push(shape.x)
      this.shapes.y.push(shape.y)
      this.shapes.width.push(shape.width)
      this.shapes.height.push(shape.height)
      this.shapes.color.push(shape.color)
      this.shapes.type.push(shape.type)
      this.zipShapes()
    },
    transformCircles() {
      switch (this.mode) {
        case "normal":
          circlesToRectangles(this.zippedShapes)
          this.$refs.canvas.draw()
          break
        case "parallel":
          circlesToRectanglesAsync(this.zippedShapes)
            .then(() => {
              this.$refs.canvas.draw()
            })
            .catch(console.error)
          break
      }
    },
    filterCircles() {
      this.zippedShapes = getCircles(this.zippedShapes)
    },
    filterRectangles() {
      this.zippedShapes = getRectangles(this.zippedShapes)
    },
    zipShapes() {
      this.zippedShapes = zip(this.shapes)
    },
  },
}
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>

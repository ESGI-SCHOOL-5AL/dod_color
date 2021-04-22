<template>
  <div class="canvas-container">
    <canvas :height="height" :width="width" ref="canvas" />
    <div>
      <span
        v-for="c in colors"
        :key="c"
        :style="{ 'background-color': c }"
        class="color"
      />
    </div>
  </div>
</template>

<script>
import { calculateOccupiedSpace } from "../shape.js"

export default {
  name: "Canvas",
  props: {
    height: { type: Number, default: 500 },
    width: { type: Number, default: 500 },
    shapes: { type: Array, required: true },
  },
  data() {
    return {
      canvas: null,
    }
  },
  computed: {
    occupiedSpace() {
      return calculateOccupiedSpace(this.shapes)
    },
    colors() {
      return this.occupiedSpace.colors
    },
  },
  watch: {
    height() {
      this.$nextTick(() => {
        this.draw()
      })
    },
    width() {
      this.$nextTick(() => {
        this.draw()
      })
    },
    shapes: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.draw()
        })
      },
    },
  },
  mounted() {
    this.canvas = this.$refs.canvas.getContext("2d")
    this.draw()
  },
  methods: {
    draw() {
      this.clear()
      this.shapes.forEach((s) => {
        this.canvas.strokeStyle = s.color
        this.canvas.fillStyle = s.color
        switch (s.type) {
          case "circle":
            this.canvas.beginPath()
            this.canvas.arc(s.x, s.y, s.width / 2, 0, 2 * Math.PI, false)
            this.canvas.fill()
            break
          case "rect":
            this.canvas.fillRect(s.x, s.y, s.width, s.height)
            break
        }
      })
      this.drawOccupiedSpace()
    },
    drawOccupiedSpace() {
      const space = this.occupiedSpace
      this.canvas.strokeStyle = "#363636"
      this.canvas.setLineDash([10])
      this.canvas.strokeRect(
        space.minX,
        space.minY,
        space.maxX - space.minX,
        space.maxY - space.minY
      )
      this.canvas.setLineDash([])
    },
    clear() {
      this.canvas.clearRect(0, 0, this.width, this.height)
    },
  },
}
</script>

<style lang="scss" scoped>
canvas {
  border: solid 1px black;
}

.canvas-container {
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > * {
    margin: auto;
  }
}

.color {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 1rem;
}
</style>

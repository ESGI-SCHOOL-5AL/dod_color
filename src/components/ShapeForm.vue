<template>
  <form @submit.prevent="submit">
    <div>
      <label for="x">X&nbsp;:&nbsp;</label>
      <input
        type="number"
        placeholder="X"
        v-model.number="x"
        required
        name="x"
      />
    </div>
    <div>
      <label for="y">Y&nbsp;:&nbsp;</label>
      <input
        type="number"
        placeholder="Y"
        v-model.number="y"
        required
        name="y"
      />
    </div>
    <div>
      <label for="width">Largeur&nbsp;:&nbsp;</label>
      <input
        type="number"
        placeholder="Width"
        v-model.number="width"
        required
        name="width"
      />
    </div>
    <div>
      <label for="height">Hauteur&nbsp;:&nbsp;</label>
      <input
        type="number"
        placeholder="Height"
        v-model.number="height"
        required
        name="height"
      />
    </div>
    <div>
      <label for="color">Couleur&nbsp;:&nbsp;</label>
      <input placeholder="Color" v-model="color" required name="color" />
    </div>

    <div>
      <label for="type">Forme&nbsp;:&nbsp;</label>
      <select v-model="type" required name="type">
        <option disabled value="">Forme</option>
        <option value="rect">Rectangle</option>
        <option value="circle">Cercle</option>
      </select>
    </div>

    <button type="button" @click="submit">Ajouter</button>
  </form>
</template>

<script>
export default {
  name: "ShapeForm",
  data() {
    // return {
    //   x: undefined,
    //   y: undefined,
    //   width: undefined,
    //   height: undefined,
    //   color: "",
    //   shape: "",
    // }
    return {
      x: 25,
      y: 25,
      width: 20,
      height: 20,
      color: "#ff0000",
      type: "rect",
    }
  },
  methods: {
    submit() {
      this.$emit("submit", {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        color: this.color,
        type: this.type,
      })
      // this.reset()
    },
    reset() {
      this.x = undefined
      this.y = undefined
      this.width = undefined
      this.height = undefined
      this.color = ""
      this.shape = ""
      this.type = ""
    },
  },
}
</script>

<style lang="scss" scoped>
form > div {
  margin: 1rem;
}
</style>

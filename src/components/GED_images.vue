<template>
  <div>
    <div class="container">
      <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <input type="file" @change="uploadFile">
          </div>
          <div class="form-group">
            <button class="btn btn-success btn-block btn-lg">Upload image</button>
          </div>
      </form>
    </div>
    <div class="container">
      <!--<div v-for="(image, index) in images" :key="`img-${index}`">
        {{ image.name + ' (' + image.desc + ')' }}
        <img :src="image.data" style="width:200px;" />
      </div>-->
      <div class="card-deck">
        <div class="card" v-for="(image, index) in images" :key="`img-${index}`">
          <img :src="image.data" class="card-img-top" :alt="image.name">
          <div class="card-body">
            <h5 class="card-title">{{ image.name }}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
      <!--
      <div class="row">
        <div class="col-sm d-flex" v-for="(image, index) in images" :key="`img-${index}`" style="height: 18rem;">
        <div class="card flex-fill">
          <img :src="image.data" class="card-img-top" :alt="image.name">
          {{ image.name }}
          
        </div>
        </div>
      </div>
      -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      files: null,
      images: Array()
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.renderImages()
    })
  },
  methods: {
    uploadFile (event) {
    this.files = event.target.files
    },
    handleSubmit() {
      const formData = new FormData();
      for (const i of Object.keys(this.files)) {
        formData.append('image', this.files[i])
      }
      axios.post('http://localhost:4000/api/image-upload', formData, {
      }).then((res) => {
        console.log(res)
        this.images = []
        this.renderImages()
      })
    },
    renderImages() {
      axios.get('http://localhost:4000/api/images', {
      }).then((res) => {
        //this.images = res.data.images

        res.data.images.forEach(image => {
          let bytes = new Uint8Array(image.body.data.data)
          let binary = bytes.reduce((data,b) => data += String.fromCharCode(b), '')
          let base64img = 'data:' + image.body.contentType + ';base64,' + btoa(binary)
          this.images.push({
            name: image.name,
            desc: image.desc,
            data: base64img
          });
        });

        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
.card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}
</style>

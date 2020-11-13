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
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      files: null,
      images: null
    };
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
      })
    }
  }
}
</script>

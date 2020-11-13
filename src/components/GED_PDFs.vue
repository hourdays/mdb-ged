<template>
  <div>
    <div class="container">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <input type="file" @change="uploadFile">
        </div>
        <div class="form-group">
          <button class="btn btn-success btn-block btn-lg">Upload PDF</button>
        </div>
      </form>
    </div>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">MDB id</th>
            <th scope="col">Name</th>
            <th scope="col">Desc</th>
            <th scope="col">File</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pdf, index) in PDFs" :key="`pdf-${index}`">
            <th scope="row">{{ index+1 }}</th>
            <td>{{ pdf.mdbObjId }}</td>
            <td>{{ pdf.name }}</td>
            <td>{{ pdf.desc }}</td>
            <td><a :download="pdf.name" :href="pdf.data" title="Download PDF"><img src="@/assets/PDF_icon.png" style="width:32px;" /></a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      files: null,
      PDFs: Array()
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.getPDFs()
    })
  },
  methods: {
    uploadFile (event) {
    this.files = event.target.files
    },
    handleSubmit() {
      const formData = new FormData();
      for (const i of Object.keys(this.files)) {
        formData.append('pdf', this.files[i])
      }
      axios.post('http://localhost:4000/api/pdf-upload', formData, {
      }).then((res) => {
        console.log(res)
        this.PDFs = []
        this.getPDFs()
      })
    },
    getPDFs() {
      axios.get('http://localhost:4000/api/PDFs', {
      }).then((res) => {
        //this.PDFs = res.data.PDFs

        res.data.PDFs.forEach(pdf => {
          let bytes = new Uint8Array(pdf.body.data.data)
          let binary = bytes.reduce((data,b) => data += String.fromCharCode(b), '')
          let base64pdf = 'data:' + pdf.body.contentType + ';base64,' + btoa(binary)
          this.PDFs.push({
            mdbObjId: pdf._id,
            name: pdf.name,
            desc: pdf.desc,
            data: base64pdf
          });
        });

        console.log(res)
      })
    }
  }
}
</script>

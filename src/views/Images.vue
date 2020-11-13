<template>
  <div id="images">
    <h1>Manage images thanks to MongoDB</h1>
    <GedImages />
  </div>
</template>

<script>
// @ is an alias to /src
import GedImages from '@/components/GED_images.vue'

export default {
  name: 'Images',
  components: {
    GedImages
  }
}
</script>

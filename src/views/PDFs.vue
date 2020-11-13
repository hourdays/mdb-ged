<template>
  <div id="PDFs">
    <h1>Manage PDFs thanks to MongoDB</h1>
    <GedPDFs />
  </div>
</template>

<script>
// @ is an alias to /src
import GedPDFs from '@/components/GED_PDFs.vue'

export default {
  name: 'PDFs',
  components: {
    GedPDFs
  }
}
</script>

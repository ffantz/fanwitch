<template>
  <MainContent v-if="barraPesquisa == ''" />
</template>

<script>
import MainContent from '@/components/MainContent.vue'

export default {
  components: {
    MainContent,
  },
  computed: {
  },
}
</script>

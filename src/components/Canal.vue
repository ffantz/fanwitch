<template>
  <div>
    {{ canal }}
  </div>
</template>

<script>

export default {
  components: {
  },
  data: () => ({
    canal: ''
  }),
  computed: {
    canais() {
      return this.$store.getters["global/getCanaisRecomendados"].filter((canal) => {
        return canal.recomendacoes > 0
      })
    },
  },
  created(){
    this.canais.forEach(element => {
      if (element.username == this.$route.params.username) {
        this.canal = element
      }
    })
  }
}
</script>

<style scoped lang="scss">

</style>
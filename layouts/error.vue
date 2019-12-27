<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">
      Article non trouvée
    </h1>
    <h1 v-else>
      Une erreur s'est produite
    </h1>
    <a href="skip-the-spirits-with-delicious-mocktails">Essayer cet Article</a>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>

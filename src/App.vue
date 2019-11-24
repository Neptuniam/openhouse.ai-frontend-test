<template>
<div id="app">
    <div v-if="communities && homes">
        <MainDisplay :communities="communities" :homes="homes" />
    </div>
    <div v-else uk-spinner="ratio: 10" class="Spinner row center-xs middle-xs" />
</div>
</template>

<script>
export default {
  name: 'app',
  data: function() {
      return {
          communities: null,
          homes: null
      }
  },
  mounted: function() {
      this.axios.get('https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/communities').then(response => {
          this.communities = response.data.sort((a,b) => a.name > b.name ? 1 : -1)
          console.log("For communities, got: ", response.data);
      }).catch(error => {
          alert("failed to retrieve communities! Got error:", error);
      })

      this.axios.get('https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/homes').then(response => {
          this.homes = response.data
          console.log("For homes, got: ", response.data);
      }).catch(error => {
          alert("failed to retrieve homes! Got error:", error);
      })
  },
}
</script>

<style>
    .Spinner {
        height: 100vh;
        width: 100vw;
    }

    .fullWidth { width:100% !important; }
</style>

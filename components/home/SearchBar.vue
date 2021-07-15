<template>
  <form action="#">
    <input
      type="text"
      placeholder="zadej nick"
      v-model="nick"
      ref="input"
      @keyup="searchNick"
    />
  </form>
</template>

<script>
export default {
	computed: {
		nick() {
			return this.$store.state.nick;
		},
	},
	methods: {
		searchNick(event) {
			this.$store.commit("searchNick", event.target.value);
		},
	},
};
</script>

<style lang="scss" scoped></style>

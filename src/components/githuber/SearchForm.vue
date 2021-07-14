<template>
	<div>
		<input type="text" placeholder="Zadej nick" v-model="value" />
		<button @click="getNick(value), findGithuberProfile()">hledej</button>
	</div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
	data() {
		return {
			value: "Inza",
		};
	},
	methods: {
		...mapMutations(["getNick"]),
		...mapActions(["findGithuberProfile"]),
	},
};
</script>

<style lang="scss" scoped></style>

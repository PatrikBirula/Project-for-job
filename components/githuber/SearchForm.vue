<template>
	<div>
		<input type="text" placeholder="Zadej nick" v-model="value" />
		<button @click="getNick(value), findGithuberProfile(), findGithuberRepos()">
			hledej
		</button>
	</div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
	data() {
		return {
			value: "",
		};
	},
	methods: {
		...mapMutations(["getNick"]),
		...mapActions(["findGithuberProfile", "findGithuberRepos"]),
	},
};
</script>

<style lang="scss" scoped></style>

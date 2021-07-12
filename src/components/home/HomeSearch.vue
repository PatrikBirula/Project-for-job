<template>
	<form action="#" v-on:submit.prevent>
		<input @keyup="searchGit()" type="text" v-model="nick" ref="input" />
	</form>
	<div v-if="github.name">
		<img :src="github.avatar_url" alt="Githuber photo" />
		<h2>{{ github.name }}</h2>
	</div>
</template>

<script>
import axios from "axios";
import { debounce } from "lodash-es";

export default {
	data() {
		return {
			nick: "",
			github: {},
		};
	},
	methods: {
		searchGit: debounce(function () {
			let api = "https://api.github.com/users/" + this.nick;
			let vm = this;
			axios.get(api).then(function (response) {
				vm.github = response.data;
				console.log(vm.github);
			});
		}, 500),
	},
};
</script>

<style lang="scss" scoped></style>

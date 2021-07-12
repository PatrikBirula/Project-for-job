<template>
	<form action="#" @submit.prevent>
		<input
			v-model="nick"
			placeholder="Type Username"
			@keyup="
				getUser();
				getRepos();
			"
			ref="input"
		/>
	</form>
	<div v-if="user.name">
		<img :src="user.avatar_url" alt="Githuber image" />
		<h1>{{ user.name }}</h1>
	</div>
	<div v-for="(repo, index) in repos" :key="index">
		<h2>{{ repo.name }}</h2>
		<p>{{ repo.description }}</p>
	</div>
</template>

<script>
import axios from "axios";
import { debounce } from "lodash-es";

export default {
	data() {
		return {
			nick: "",
			repos: "",
			user: "",
		};
	},
	methods: {
		getUser: debounce(function () {
			axios
				.get(`https://api.github.com/users/${this.nick}`)
				.then((response) => {
					this.user = response.data;
					console.log(this.user);
				})
				.catch((error) => {
					console.log(error);
				});
		}, 500),
		getRepos: debounce(function () {
			axios
				.get(`https://api.github.com/users/${this.nick}/repos`)
				.then((response) => {
					this.repos = response.data;
				})
				.catch((error) => {
					console.log(error);
				});
		}, 500),
	},
	mounted() {
		this.$refs.input.focus();
	},
};
</script>

<style lang="scss" scoped></style>

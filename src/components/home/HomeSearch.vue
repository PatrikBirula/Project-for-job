<template>
	<form action="#" @submit.prevent>
		<input
			v-model="nick"
			placeholder="Type Username"
			@keyup="getUser(), getRepos()"
			ref="input"
		/>
		<div v-if="user.name">
			<img :src="user.avatar_url" alt="Githuber image" />
			<h1>{{ user.name }}</h1>
		</div>
		<ul>
			<li v-for="(repo, index) in repos" :key="index">
				<h2 v-on:click="getCommits(repo)">{{ repo.repoName }}</h2>
				<p>{{ repo.repoDescription }}</p>
			</li>
		</ul>
	</form>
</template>

<script>
import axios from "axios";
import { debounce } from "lodash-es";

export default {
	data() {
		return {
			nick: "Inza",
			user: "",
			repos: [],
			value: [],
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
					this.repos = [];
					this.value = [];
					response.data.forEach((repo) => {
						this.repos.push(this.extractData(repo));
						this.value.push(this.extractDataName(repo));
					});
				})
				.catch((error) => {
					console.log(error);
				});
		}, 500),
		findMe(repo) {
			console.log(repo.repoName);
		},
		extractData({ name: repoName, description: repoDescription, id: idM }) {
			return { repoName, repoDescription, idM };
		},
		extractDataName({ name: repoName }) {
			return { repoName };
		},

		getCommits(repo) {
			console.log(repo.repoName);
			axios
				.get(
					`https://api.github.com/repos/${this.nick}/${repo.repoName}/commits`
				)
				.then((response) => {
					this.arrayOne = response.data;
					console.log(this.arrayOne);
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>

<style lang="scss" scoped>
li {
	list-style-type: none;
}
</style>

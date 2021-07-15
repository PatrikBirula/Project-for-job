<template>
	<form action="#" @submit.prevent>
		<input
			v-model="nick"
			placeholder="Type Username"
			@keyup="getUser()"
			ref="input"
		/>
	</form>
	<ul>
		<li v-for="(repo, index) in repos" :key="index">
			<transition name="fade">
				<article v-cloak>
					<div>
						<h2>{{ repo.repoName }}</h2>
						<p>{{ repo.repoDescription }}</p>
					</div>
					<button @submit.prevent v-on:click="getBranches(repo)">
						Show Branches
					</button>
					<button @submit.prevent v-on:click="getCommits(repo)">
						Show Commits
					</button>
				</article>
			</transition>
		</li>
	</ul>
</template>

<script>
import axios from "axios";
import { debounce } from "lodash-es";

export default {
	data() {
		return {
			nick: "Inza",
			repos: [],
			value: [],
			commits: [],
			branches: [],
		};
	},
	methods: {
		getUser: debounce(function () {
			axios
				.get(`https://api.github.com/users/${this.nick}`)
				.then((response) => {
					this.users = response.data;
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
		getCommits(repo) {
			console.log(repo.repoName);
			axios
				.get(
					`https://api.github.com/repos/${this.nick}/${repo.repoName}/commits`
				)
				.then((response) => {
					this.commits = response.data;
					console.log(this.arrayOne);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		getBranches(repo) {
			console.log(repo.repoName);
			axios
				.get(
					`https://api.github.com/repos/${this.nick}/${repo.repoName}/branches`
				)
				.then((response) => {
					this.branches = response.data;
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
.fade-enter-active {
	transition: all 1s ease;
}
.fade-enter {
	transform: scale(0.5);
}
</style>

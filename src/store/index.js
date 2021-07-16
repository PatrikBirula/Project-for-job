import { createStore } from "vuex";
import axios from "axios";
export default createStore({
	state: {
		counter: 0,
		history: [0],
		nick: "",
		info: [],
		repos: [],
		reponame: [],
		commits: [],
		branches: [],
		show: "",
		error: "",
	},
	mutations: {
		showDetails(state) {
			state.show = "show";
		},
		hideDetails(state) {
			state.show = "hide";
		},
		showError(state) {
			state.error = "show";
		},
		hideError(state) {
			state.error = "hide";
		},
		getNick(state, payload) {
			state.nick = payload;
			console.log(state.nick);
		},
		getInfo(state, payload) {
			state.info = payload;
		},
		getRepos(state, payload) {
			state.repos = payload;
		},
		repoName(state, payload) {
			state.reponame = payload;
		},
		getCommits(state, payload) {
			state.commits = payload;
		},
		getBranches(state, payload) {
			state.branches = payload;
		},
	},
	actions: {
		async findGithuberProfile({ commit, state }) {
			await axios
				.get("https://api.github.com/users/" + state.nick)
				.then((response) => {
					state.info = response.data;
					commit("hideError");
				})
				.catch(() => {
					commit("showError");
				});
			commit("getInfo", state.info);
		},
		async findGithuberRepos({ commit, state }) {
			await axios
				.get("https://api.github.com/users/" + state.nick + "/repos")
				.then((response) => {
					state.repos = response.data;
				})
				.catch((error) => {
					console.log(error);
				});
			commit("getRepos", state.repos);
		},
		async findGithuberCommits({ commit, state }) {
			await axios
				.get(
					"https://api.github.com/repos/" +
						state.nick +
						"/" +
						state.reponame +
						"/commits"
				)
				.then((response) => {
					state.commits = response.data.slice(0, 10);
				})
				.catch((error) => {
					console.log(error);
				});
			commit("getCommits", state.commits);
			console.log(state.commits);
		},
		async findGithuberBranches({ commit, state }) {
			await axios
				.get(
					"https://api.github.com/repos/" +
						state.nick +
						"/" +
						state.reponame +
						"/branches"
				)
				.then((response) => {
					state.branches = response.data;
				})
				.catch((error) => {
					console.log(error);
				});
			commit("getBranches", state.branches);
			console.log(state.branches);
		},
	},
});

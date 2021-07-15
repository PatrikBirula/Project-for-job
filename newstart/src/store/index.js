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
  },
  mutations: {
    addToCounter(state, payload) {
      state.counter = state.counter + payload;
      state.history.push(state.counter);
    },
    subtractFromCounter(state, payload) {
      state.counter = state.counter - payload;
      state.history.push(state.counter);
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
    async addRandomNumber(context) {
      let data = await axios.get(
        `https://www.random.org/integers/?num=1&min=-1000&max=1000&col=1&base=10&format=plain&rnd=new`
      );
      console.log(data);
      context.commit("addToCounter", data.data);
    },
    async findGithuberProfile({ commit, state }) {
      let data = await axios.get("https://api.github.com/users/" + state.nick);
      commit("getInfo", data.data);
    },
    async findGithuberRepos({ commit, state }) {
      let data = await axios.get(
        "https://api.github.com/users/" + state.nick + "/repos"
      );
      commit("getRepos", data.data);
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
        });
      commit("getBranches", state.branches);
      console.log(state.branches);
    },
  },
  getters: {
    activeIndexes: (state) => (payload) => {
      let indexes = [];
      state.history.forEach((number, index) => {
        if (number === payload) {
          indexes.push(index);
        }
      });
      return indexes;
    },
  },
  modules: {},
});

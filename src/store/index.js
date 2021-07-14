import { createStore } from "vuex";
import axios from "axios";
export default createStore({
	state: {
		counter: 0,
		history: [0],
		nick: "",
		info: [],
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
		getInfo(state, info) {
			state.info = info;
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
			await axios
				.get("https://api.github.com/users/" + state.nick + "/repos")
				.then((response) => {
					console.log(response.data);
					commit("getInfo", response.data);
				})
				.catch((error) => {
					console.log(error);
				});
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

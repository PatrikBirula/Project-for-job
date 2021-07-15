<template>
	<div>
		<ul v-for="(repo, index) in repos" :key="index">
			<li @click="repoName(repo.name), findGithuberCommits()">
				<div>
					<h2>{{ repo.name }}</h2>
					<h3>{{ repo.description }}</h3>
				</div>
				<div>
					<githuber-branches-commits />
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import GithuberBranchesCommits from "./GithuberBranchesCommits.vue";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
	components: {
		GithuberBranchesCommits,
	},
	computed: {
		...mapState(["repos"]),
	},
	methods: {
		...mapMutations(["repoName"]),
		...mapActions(["findGithuberCommits"]),
	},
};
</script>

<style lang="scss" scoped></style>

<template>
	<div>
		<ul v-for="(repo, index) in repos" :key="index">
			<li
				@click="
					repoName(repo.name), findGithuberCommits(), findGithuberBranches()
				"
			>
				<div>
					<h2>{{ repo.name }}</h2>
					<h3>{{ repo.description }}</h3>
				</div>
				<button>{{ $t("moredetails") }}</button>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
	computed: {
		...mapState(["repos"]),
	},
	methods: {
		...mapMutations(["repoName"]),
		...mapActions(["findGithuberCommits", "findGithuberBranches"]),
	},
};
</script>

<style lang="scss" scoped></style>

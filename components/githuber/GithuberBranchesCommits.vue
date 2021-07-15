<template>
	<div>
		<article>
			<h4>All branches</h4>
			<ul>
				<li></li>
			</ul>
		</article>
		<article>
			<h4>Last 10 commits</h4>
			<ul v-for="(commit, index) in commits" :key="index">
				<li>{{ commit.commit.message }}</li>
			</ul>
		</article>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	computed: {
		...mapState(["commits"]),
	},
};
</script>

<style lang="scss" scoped></style>

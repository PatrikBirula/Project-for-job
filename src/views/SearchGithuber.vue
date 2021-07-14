<template>
  <div class="searchgithuber">
    <h1>Najdi svého oblíbeného Githubera!</h1>
    <h2>{{ nick }}</h2>
    <search-form />
  </div>
  <article>
    <about-githuber />
  </article>
</template>

<script>
import SearchForm from "../components/githuber/SearchForm.vue";
import AboutGithuber from "../components/githuber/AboutGithuber.vue";
import { mapState } from "vuex";

export default {
	name: "SearchGithuber",
	components: {
		SearchForm,
		AboutGithuber,
	},
	computed: {
		...mapState(["nick"]),
	},
};
</script>

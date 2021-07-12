<template>
	<div class="home">
		<h1>Koukni na svého oblíbeného Githubera</h1>
		<HomeSearch />
		<ul></ul>
	</div>
</template>

<script>
import HomeSearch from "@/components/home/HomeSearch.vue";

export default {
	name: "Home",
	components: {
		HomeSearch,
	},
};
</script>

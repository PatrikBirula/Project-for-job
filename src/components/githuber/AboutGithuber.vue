<template>
	<div v-for="(item, index) in info" :key="index">
		<h1>{{ item.name }}</h1>
		<p>{{ item.description }}</p>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	computed: {
		...mapState(["info"]),
	},
};
</script>

<style lang="scss" scoped></style>

<template>
	<div v-if="info.avatar_url">
		<img :src="info.avatar_url" alt="Githuber avatar" />
		<h1>
			{{ info.name }}
		</h1>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	computed: {
		...mapState(["info", "nick"]),
	},
};
</script>

<style lang="scss" scoped></style>

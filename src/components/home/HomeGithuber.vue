<template>
	<div
		v-for="(user, index) in users"
		:key="index"
		@click="userItemPressed(user)"
	>
		<img :src="user.avatar_url" alt="Githuber image" />
		<h1>{{ user.name }}</h1>
	</div>
</template>

<script>
export default {
	data() {
		return {
			users: [],
		};
	},
};
</script>

<style lang="scss" scoped></style>

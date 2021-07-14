<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<component-1 />
	</div>
</template>

<script>
import Component1 from "../components/Component1.vue";
export default {
	name: "Home",
	components: {
		Component1,
	},
};
</script>

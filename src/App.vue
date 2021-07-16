<template>
	<form class="language text-end">
		<select
			id="locale-select"
			v-model="currentLocale"
			class="languagebtn borderradius"
		>
			<option
				v-for="optionLocale in supportLocales"
				:key="optionLocale"
				:value="optionLocale"
			>
				{{ optionLocale }}
			</option>
		</select>
	</form>

	<div id="nav">
		<router-link :to="{ name: 'searchgithuber', params: { locale } }">
			{{ t("navigations.home") }}
		</router-link>
		|
		<router-link :to="{ name: 'about', params: { locale } }">
			{{ t("navigations.about") }}
		</router-link>
	</div>
	<router-view />
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";

import { defineComponent, watch, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { SUPPORT_LOCALES } from "./i18n";
export default defineComponent({
	name: "App",
	setup() {
		const router = useRouter();
		const { t, locale } = useI18n({ useScope: "global" });
		/**
		 * select locale value for language select form
		 *
		 * If you use the vue-i18n composer `locale` property directly, it will be re-rendering component when this property is changed,
		 * before dynamic import was used to asynchronously load and apply locale messages
		 * To avoid this, use the another locale reactive value.
		 */
		const currentLocale = ref(locale.value);
		// sync to switch locale from router locale path
		watch(router.currentRoute, (route) => {
			currentLocale.value = route.params.locale;
		});
		/**
		 * when change the locale, go to locale route
		 *
		 * when the changes are detected, load the locale message and set the language via vue-router navigation guard.
		 * change the vue-i18n locale too.
		 */
		watch(currentLocale, (val) => {
			router.push({
				name: router.currentRoute.value.name,
				params: { locale: val },
			});
		});
		return { t, locale, currentLocale, supportLocales: SUPPORT_LOCALES };
	},
});
</script>

<style lang="scss">
body {
	width: 90%;
	margin: 0 auto;
	background: #022c43;
}
.borderradius {
	border-radius: 3rem;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #fff;
}
#nav {
	padding: 30px;
	a {
		font-weight: bold;
		color: #fff;
		&.router-link-exact-active {
			color: #ffd700;
		}
	}
}
.yellowtext {
	color: #ffd700;
}
li {
	list-style-type: none;
	margin-bottom: 2%;
}
a {
	cursor: pointer;
	font-size: 1.2rem;
	text-decoration: none;
	color: #fff;
}
a:hover,
a:focus {
	color: #022c43;
}
</style>

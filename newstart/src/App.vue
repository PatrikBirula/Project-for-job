<template>
  <form class="language">
    <select
      id="locale-select"
      v-model="currentLocale"
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
      {{ t('navigations.home') }}
    </router-link>
    |
    <router-link :to="{ name: 'about', params: { locale } }">
      {{ t('navigations.about') }}
    </router-link>
  </div>
  <router-view />
</template>

<script>
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
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>

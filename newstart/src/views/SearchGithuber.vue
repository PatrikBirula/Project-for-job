<template>
  <div>
    <h1>{{ t('labels.searchgithuber') }}</h1>
    <search-form />
  </div>
  <article>
    <about-githuber />
  </article>
  <article>
    <githuber-repos />
  </article>
  <article>
    <githuber-branches-commits />
  </article>
</template>

<script>
import SearchForm from "../components/githuber/SearchForm.vue";
import AboutGithuber from "../components/githuber/AboutGithuber.vue";
import GithuberRepos from "../components/githuber/GithuberRepos.vue";
import GithuberBranchesCommits from "../components/githuber/GithuberBranchesCommits.vue";

import { defineComponent, watch, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { SUPPORT_LOCALES } from "@/i18n";

export default defineComponent({
	components: {
		SearchForm,
		AboutGithuber,
		GithuberRepos,
		GithuberBranchesCommits,
	},
	setup() {
		const router = useRouter();
		const { t, locale } = useI18n({ useScope: "global" });
		const currentLocale = ref(locale.value);
		watch(router.currentRoute, (route) => {
			currentLocale.value = route.params.locale;
		});
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
li {
	list-style-type: none;
}
</style>

<template>
  <div>
    <article v-if="branches">
      <h4>{{ t("labels.branches") }}</h4>
      <ul
        v-for="(branch, index) in branches"
        :key="index"
      >
        <li>{{ branch.name }}</li>
      </ul>
    </article>
    <article v-if="commits">
      <h4>{{ t('labels.commits') }}</h4>
      <ul
        v-for="(commit, index) in commits"
        :key="index"
      >
        <li>{{ commit.commit.message }}</li>
      </ul>
    </article>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { defineComponent, watch, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { SUPPORT_LOCALES } from "@/i18n";

export default defineComponent({
	data() {
		return {
			commit: "",
			limit: 10,
		};
	},
	computed: {
		...mapState(["commits", "branches"]),
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

<style lang="scss" scoped></style>

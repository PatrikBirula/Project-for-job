<template>
	<div class="about">
		<h2>{{ t("pages.about") }}</h2>
		<p>{{ t("page.abouttext") }}</p>
	</div>
</template>

<script>
import { defineComponent, watch, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { SUPPORT_LOCALES } from "@/i18n";
export default defineComponent({
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

<style lang="scss" scoped>
.about {
	max-width: 70%;
	margin: 0 auto;
	p {
		text-align: left;
	}
}
</style>

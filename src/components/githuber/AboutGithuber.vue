<template>
	<div v-if="info.avatar_url" container>
		<div class="row d-flex" id="aboutgithuber">
			<section class="col">
				<img
					:src="info.avatar_url"
					alt="Githuber avatar"
					class="borderradius"
				/>
			</section>

			<section class="col text-start">
				<h2>{{ t("labels.name") }} {{ info.name }}</h2>
				<h2>Alias: {{ info.login }}</h2>
				<h2>{{ t("labels.company") }} {{ info.company }}</h2>
				<h2>{{ t("labels.location") }} {{ info.location }}</h2>
				<h2>{{ t("labels.repos") }} {{ info.public_repos }}</h2>
				<h2>{{ t("labels.followers") }} {{ info.followers }}</h2>
			</section>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";

import { defineComponent, watch, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { SUPPORT_LOCALES } from "@/i18n";
export default defineComponent({
	computed: {
		...mapState(["info", "nick"]),
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

<style lang="scss" scoped>
img {
	width: 100%;
}
.row {
	margin: {
		top: 5%;
		bottom: 3%;
	}
}
@media (max-width: 575.98px) {
	img {
		width: 50%;
	}
	#aboutgithuber {
		display: block !important;
		section {
			text-align: center !important;
		}
	}
}
</style>

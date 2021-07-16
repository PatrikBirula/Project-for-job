<template>
	<div class="input-group justify-content-center">
		<div class="form-outline">
			<input
				type="text"
				:placeholder="t('labels.setnick')"
				v-model="value"
				class="form-control borderradius text-center"
				@keyup.enter="
					getNick(value), findGithuberProfile(), findGithuberRepos()
				"
			/>
		</div>
		<button
			id="searchbtn"
			type="button"
			class="btn-primary btn borderradius"
			@click="getNick(value), findGithuberProfile(), findGithuberRepos()"
		>
			<font-awesome-icon icon="search" />
		</button>
	</div>
	<div
		v-if="error === 'show'"
		class="alert alert-danger borderradius"
		role="alert"
	>
		{{ t("labels.error") }}
	</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

import { defineComponent, watch, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { SUPPORT_LOCALES } from "@/i18n";

export default defineComponent({
	data() {
		return {
			value: "",
			limit: 3,
		};
	},
	computed: {
		...mapState(["error"]),
	},
	methods: {
		...mapMutations(["getNick"]),
		...mapActions(["findGithuberProfile", "findGithuberRepos"]),
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
#searchbtn {
	margin-left: -42px;
}
.form-outline {
	width: 100%;
}
</style>

<template>
	<div class="container" v-if="info.avatar_url">
		<h1 class="yellowtext text-decoration-underline">{{ t("labels.repo") }}</h1>
		<ul class="row">
			<li v-for="(repo, index) in repos" :key="index" class="col-sm-6 col-lg-4">
				<article
					class="
						borderradius
						text-break
						d-flex
						flex-column
						justify-content-between
					"
				>
					<div>
						<h2 class="text-capitalize">{{ repo.name }}</h2>
						<h5 class="text-start">- {{ repo.description }}</h5>
					</div>
					<div>
						<a
							@click.prevent="
								repoName(repo.name),
									findGithuberCommits(),
									findGithuberBranches(),
									showDetails()
							"
							class="hover"
						>
							{{ t("labels.moredetails") }}</a
						>
					</div>
				</article>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

import { defineComponent, watch, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { SUPPORT_LOCALES } from "@/i18n";
export default defineComponent({
	computed: {
		...mapState(["repos", "info"]),
	},
	methods: {
		...mapMutations(["repoName", "showDetails"]),
		...mapActions(["findGithuberCommits", "findGithuberBranches"]),
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
article {
	cursor: default;
	min-height: 15rem;
	padding: {
		left: 5%;
		right: 5%;
		top: 3%;
		bottom: 1%;
	}
}
li:nth-child(5n + 1) article {
	background: #3b9ae1;
}
li:nth-child(5n + 4) article {
	background: #f6be00;
}
li:nth-child(5n + 3) article {
	background: #e64134;
}
li:nth-child(5n + 2) article {
	background: #eb70b1;
}
li:nth-child(5n + 5) article {
	background: #00af91;
}
ul {
	padding-left: 0;
}
</style>

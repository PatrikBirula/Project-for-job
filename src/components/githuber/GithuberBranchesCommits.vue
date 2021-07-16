<template>
	<div
		v-if="show === 'show'"
		class="
			container
			border border-4
			borderradius
			position-fixed
			top-50
			start-50
			translate-middle
			background
			d-flex
			flex-column
			justify-content-start
			-center
		"
		id="commitspage"
	>
		<a href="#" class="cross align-self-end" @click.prevent="hideDetails()">
			<font-awesome-icon icon="times" />
		</a>
		<section class="row justify-content-center" id="row">
			<article class="col-5">
				<h3 class="yellowtext">{{ t("labels.branches") }}</h3>
				<ol>
					<li v-for="(branch, index) in branches" :key="index">
						{{ branch.name }}
					</li>
				</ol>
			</article>
			<article class="col-5 border-start">
				<h3 class="yellowtext">{{ t("labels.commits") }}</h3>
				<ol>
					<li v-for="(commit, index) in commits" :key="index">
						{{ commit.commit.message }}
					</li>
				</ol>
			</article>
		</section>
	</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

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
		...mapState(["commits", "branches", "show"]),
	},
	methods: {
		...mapMutations(["hideDetails"]),
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
.background {
	background-color: #966c3b;
}
.cross {
	font-size: 2.5rem;
	margin-right: 1rem;
}
ol {
	li {
		list-style-type: decimal;
		text-align: left;
		padding-left: 1%;
	}
	padding-bottom: 5%;
}
#commitspage {
	height: 55rem;
}
.container {
	z-index: 99;
}
@media (max-width: 575.98px) {
	#commitspage {
		z-index: 100;
		height: 40rem;
		top: 50% !important;
		overflow-y: scroll !important;
		ol {
			padding-bottom: 0;
		}
		.col-5 {
			width: 100%;
		}
	}
	#row {
		display: block;
	}
}
</style>

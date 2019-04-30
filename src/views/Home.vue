<template>
	<div class="home">
		<timeline></timeline>
	</div>
</template>


<script>
import timeline from "./Timeline.vue";

export default {
	components: {
		timeline
	},
	name: "Home"
};
</script>

<style>
.nav-link {
	position: relative;
	z-index: 2;
	top: -10px;
	right: 50px;
}
</style>

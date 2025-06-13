<script setup>
const props = defineProps(["modelValue", "placeholder"]);
const model = defineModel();
const blockClassname = "post-type-filter-grid-v2";
</script>
<template>
	<div :class="`${blockClassname}__search-container`">
		<input :class="`${blockClassname}__search-input`" v-model="model" :placeholder="props.placeholder" />
	</div>
</template>

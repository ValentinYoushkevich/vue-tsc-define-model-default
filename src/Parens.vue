<script setup lang="ts">
defineProps<{ foo: string }>();
const model = defineModel<string>({ default: (props) => props.foo as string });
</script>

<template>{{ model }}</template>

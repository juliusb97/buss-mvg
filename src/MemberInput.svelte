<script lang="ts">
	import { Select, SelectItem, TextInput, DatePicker, DatePickerInput } from "carbon-components-svelte";
	import { Convent, MemberChild } from "./back/member.entity"

	export let memberChild: MemberChild<any>;
</script>

<!-- <span>{memberChild.type}</span> -->

{#if memberChild.type === "string"}
	<TextInput></TextInput>
{:else if memberChild.type === "date"}
	<DatePicker dateFormat="d/m/Y" datePickerType="single">
		<DatePickerInput />
	</DatePicker>
{:else if memberChild.type === "Retirement"}
	<Select>
		<SelectItem text="Nicht im Ruhestand" value=false></SelectItem>
		<SelectItem text="Ruheständler/in" value=true></SelectItem>
	</Select>
{:else if memberChild.type === "Convent"}
	<Select>
		{#each Object.entries(Convent) as convent}
			<SelectItem text={convent[1]} value={convent[1]}></SelectItem>
		{/each}
	</Select>
{/if}
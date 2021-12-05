<script lang="ts">
	import { Select, SelectItem, TextInput, DatePicker, DatePickerInput } from "carbon-components-svelte";
import { prop_dev } from "svelte/internal";
	import { Convent, MemberChild } from "./back/member.entity"

	export let memberChild: MemberChild<any>;

	// console.log(memberChild);

	// if(memberChild.displayName === "Geburtsdatum") console.log(memberChild.prop.toDateString());

</script>

<style>
	.margin-right-5 {
		margin-right: 5px;
	}

	/* input {
		background: #393939;
		border-top: 0;
		border-left: 0;
		border-right: 0;
		border-bottom: #8d8d8d 1px solid;
		color: white;
		width: 100%;
	} */
</style>

<!-- <span>{memberChild.type}</span> -->

{#if memberChild.type === "string"}
	<TextInput bind:value={memberChild.prop}></TextInput>
{:else if memberChild.type === "date"}
	<DatePicker 
		dateFormat="d.m.Y" 
		datePickerType="single" 
		flatpickrProps={{ static: true}}
	>
		<DatePickerInput value="01.12.2000" type="text"/>
	</DatePicker>
	<!-- <input type="Date" value={memberChild.prop.toDateString()}/> -->
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
{:else if memberChild.type === "Address"}
	<div class="margin-right-5"><TextInput placeholder="Straße und Nummer" value={memberChild.prop.address}></TextInput></div>
	<div class="margin-right-5"><TextInput placeholder="Stadt" value={memberChild.prop.town}></TextInput></div>
	<div class="margin-right-5"><TextInput placeholder="PLZ" value={memberChild.prop.postal}></TextInput></div>
{:else if memberChild.type === "Mail"}
	<TextInput placeholder="E-Mail" invalidText="Muss (at)-Zeichen beinhalten" value={memberChild.prop.address}></TextInput>
{/if}
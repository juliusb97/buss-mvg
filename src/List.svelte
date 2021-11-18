<script lang="ts">
export let members: any[];

let filter = "";
let filtered = members;

function filterMembers(){
	let inputFilter = (document.querySelector("#filterInput") as HTMLInputElement).value;
	if(inputFilter == "") filtered = members;
	else filtered = members.filter(mem => mem.toLowerCase().includes(inputFilter.toLowerCase()));
}
</script>

<style>
#list{
	height: 100%;
	width: 25%;
	background: #222;
	display: flex;
	flex-direction: column;
}

#members {
	overflow-y: auto;
}

.member {
	margin: 20px;
	width: calc(100% - 70px);
	background: #111;
	box-shadow: #050505 2px 2px 5px;
	padding: 15px;
	border-radius: 5px;
}

#search {
	margin: 20px;
	width: calc(100% - 40px);
	border-radius: 15px;
}

#search > input {
	background: #111;
	border: #000 1px;
	border-radius: 15px;
	width: 100%;
}
</style>

<div id="list">
	<div id="search">
		<input placeholder="Suchen..." type="text" bind:value={filter} on:input={filterMembers} id="filterInput">
	</div>
	<div id="members">
		{#each filtered as member}
			<div class="member">
				<p>{member}</p>
			</div>	
		{/each}
	</div>
</div>
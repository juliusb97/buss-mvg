<script lang="ts">
	// import { Member } from "..\\public\\back\\member.entity";

	let name = 'world';
	// let member: Promise<Member>;

	async function fetchMembers(): Promise<string> {
		return await fetch('http://127.0.0.1:9400/test')
		  .then(response => response.text())
		  .then(data => {
			// console.log(data);
			// let memberFetched = Member.deserialize(JSON.stringify(data));
			// return memberFetched;
			name = data;
			return data;
		  });
	}

	// member = fetchMembers();
	fetchMembers();
</script>

<h1>Hello {name}!</h1>

<!-- {#await member}
	<p>Lädt...</p>
{:then value}
	<p>{value.firstName} {value.lastName}</p>
{:catch}
	<p>Promise konnte nicht gelöst werden.</p>
{/await} -->
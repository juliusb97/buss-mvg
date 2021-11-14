<script lang="ts">
	import { Member } from "..\\public\\back\\member.entity";

	let name = 'world';

	async function fetchMembers() {
		fetch('http://127.0.0.1:9400/test')
		  .then(response => response.json())
		  .then(data => {
			console.log(data);
			let member = Member.deserialize(JSON.stringify(data));
			// console.log(member.serialize());
		  });

	}

	fetchMembers();
</script>

<h1>Hello {name}!</h1>

<p>Validation input</p>
<p>Validation input 2</p>
<script lang="ts">
	let name = 'world';

	async function fetchMembers() {
		// let data = await fetch("127.0.0.1:9400/test");
		// console.log(data);
		// let reader = data.body.getReader();

		// let val = await reader.read().then(function processText({ done, value}) {
		// 	if(done){
		// 		console.log(value);
		// 		return value;
		// 	}
		// });
		// console.log(val);

		fetch('http://127.0.0.1:9400/test')
		  .then(response => response.json())
		  .then(data => console.log(data));

	}

	fetchMembers();
</script>

<h1>Hello {name}!</h1>

<p>Validation input</p>
<p>Validation input 2</p>
<script>
	import "carbon-components-svelte/css/g90.css";
	import "carbon-components-svelte/css/all.css";
	import List from "./List.svelte";
	import MemberPage from "./MemberPage.svelte";
  	let theme = "g90"; // "white" | "g10" | "g80" | "g90" | "g100"

  	$: document.documentElement.setAttribute("theme", theme);

	let member = {firstName: "Max", lastName: "Mustermann", location: "Berlin", alter: 30};
</script>

<style>
	#main {
		display: flex;
		flex-direction: row;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		outline: 0;
		margin: 0;
		padding: 0;
		border: 0;
	}

	#main > div {
		padding: 15px;
	}

	#classList {
		width: 25%;
		height: 100%;
		background: #222;
	}

	#memberPage {
		flex-grow: 1;
	}
</style>

<div id="main">
	<div id="classList">
		<List/>
	</div>
	<div id="memberPage">
		<MemberPage member={member}/>
	</div>
</div>
<script>
	import "carbon-components-svelte/css/g90.css";
	import "carbon-components-svelte/css/all.css";
	import List from "./List.svelte";
	import MemberPage from "./MemberPage.svelte";
	import { Member, Mail, date, Address, Retirement, Convent } from "..\\src\\back\\member.entity";
  	let theme = "g90"; // "white" | "g10" | "g80" | "g90" | "g100"

  	$: document.documentElement.setAttribute("theme", theme);
	let muster = new Member(
		"Max",
		"Mustermann",
		new date(1, 2, 1960),
		new Address("Berlin", "01219", "Schlossallee 10"),
		Convent.N, "Diakon",
		new date(11, 2, 1996),
		new date(15, 7, 200),
		"verh. mit Mustermann, Erika geb. Schmidt",
		new Mail("max.muster@t-online.de"),
		new Mail("max.muster@musterfirma.de"),
		new date(21, 8, 1985),
		new date(19, 2, 1997),
		"Dipl. Sozialpädagoge",
		Retirement.nicht,
		"01234/567890",
		"01234/567890",
		"01234/567890",
		"01234/567890"
	);
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
		display: flex;
		overflow: auto;
	}
</style>

<div id="main">
	<div id="classList">
		<List/>
	</div>
	<div id="memberPage">
		<MemberPage member={muster}/>
	</div>
</div>
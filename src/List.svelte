<script lang="ts">
    import { ClickableTile, Search } from "carbon-components-svelte";
    import Search20 from "carbon-icons-svelte/lib/Search20";
    import type { Member } from "./back/member.entity";

    export let members: Member[],
        currentMember: Member;

    let Members = ["Max Mustermann", "Laura Schmidt", "Erika Mustermann", "Angela Merkel", "Elton John", "Scarlett Johansson", "Chris Pratt", "Marilyn Manson", "Sankt Martin", "Simon Kretschmer", "Johnny Depp", "Kate Upton"];
    let filteredMembers: Member[];

    $: filteredMembers = members;

    let filter = "";

    function filterMembers(filter: string): Member[] {
        return filteredMembers = members.filter((member) => (member.firstName.prop.toLocaleLowerCase()+ " " + member.lastName.prop.toLocaleLowerCase()).includes(filter.toLocaleLowerCase()));
    }

    $: filteredMembers = filterMembers(filter);
</script>

<style>
    #main {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    #list {
        overflow-y: scroll;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    #searchBar {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .memberWrapper {
        margin: 15px;
        margin-bottom: 3px;
    }

    hr {
        width: 85%;
    }
</style>

<div id="main">
    <div id="searchBar">
        <Search bind:value={filter} placeholder="Suchen..."/>
        <!-- <input id="memberSearchbar" type="text" placeholder="Suchen...">
        <Search20/> -->
    </div>
    <hr>
    <div id="list">
        {#each filteredMembers as member}
            <div class="memberWrapper" on:click={() => {currentMember = member; console.log(member);}}>
                <ClickableTile class="membersInList">
                    {member.firstName.prop + " " + member.lastName.prop}
                </ClickableTile>
            </div>
        {/each}
</div>
</div>
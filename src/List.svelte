<script>
    import { ClickableTile, Search } from "carbon-components-svelte";
    import Search20 from "carbon-icons-svelte/lib/Search20";

    let members = ["Max Mustermann", "Laura Schmidt", "Erika Mustermann", "Angela Merkel", "Elton John", "Scarlett Johansson", "Chris Pratt", "Marilyn Manson", "Sankt Martin", "Simon Kretschmer", "Johnny Depp", "Kate Upton"];

    let filter = "";
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
        {#each members as member}
            <div class="memberWrapper">
                <ClickableTile class="membersInList">
                    {member}
                </ClickableTile>
            </div>
        {/each}
</div>
</div>
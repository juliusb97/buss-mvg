<script>
    import { 
        Button, 
        ToastNotification,
        StructuredList,
        StructuredListHead,
        StructuredListRow,
        StructuredListCell,
        StructuredListBody,
    } from "carbon-components-svelte";
    import Save20 from "carbon-icons-svelte/lib/Save20";
    import Rotate20 from "carbon-icons-svelte/lib/Rotate20";
    export let member;

    let memberEntries = Object.entries(member);
    let toastDiv;
    let isToastShown = false;

    function triggerToast(){
        isToastShown = true;

        window.setTimeout(() => isToastShown = false, 3100);
    }
</script>

<style>
    #saveText {
        margin-left: 5px;
    }

    #saveButton {
        position: fixed;
        right: 20px;
        bottom: 20px;
    }

    #saveToast {
        position: fixed;
        right: -350px;
    }

    .showToast {
        animation: slideInToast 3s forwards;
    }

    @keyframes slideInToast {
        0% {
            right: -350px;
        }

        15% {
            right: 0px;
        }

        85% {
            right: 0px;
        }

        100% {
            right: -350px;
        }
    }

    .property {
        margin-right: 15vw;
    }

    .propertyInput {
        width: 20vw;
        margin: 0;
        margin-right: 15px;
    }

    .rowInputWrapper {
        display: flex;
        align-items: center;
    }
</style>

<div>
<StructuredList style="width: 80%;">
    <StructuredListHead>
        <StructuredListRow head>
            <StructuredListCell head>Eingeschaft</StructuredListCell>
            <StructuredListCell head>Wert</StructuredListCell>
        </StructuredListRow>
    </StructuredListHead>
    <StructuredListBody>
        {#each memberEntries as entries}
        <StructuredListRow>
            <StructuredListCell><p class="property">{entries[0]}</p></StructuredListCell>
            <StructuredListCell>
                <div class="rowInputWrapper">
                    <input  class="propertyInput" bind:value={entries[1]}>
                    <Button style="display: none" iconDescription="Zurücksetzen" size="small" kind="tertiary" icon={Rotate20}></Button>
                </div>
            </StructuredListCell>
        </StructuredListRow>
        {/each}
    </StructuredListBody>
</StructuredList>
</div>

<div id="saveButton"><Button on:click={triggerToast}><Save20/><span id="saveText">Speichern</span></Button></div>
<div id="saveToast" class="{isToastShown ? 'showToast' : ''}" bind:this={toastDiv}>
    <ToastNotification
    lowContrast
    hideCloseButton="true"
    kind="success"
    title="Gespeichert"
    subtitle="Ihre Änderungen wurden gespeichert."
    caption={new Date().toLocaleString()}
    />
</div>
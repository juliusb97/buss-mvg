<script lang="ts">
    import { 
        Button,
        Form,
        ToastNotification,
        StructuredList,
        StructuredListHead,
        StructuredListRow,
        StructuredListCell,
        StructuredListBody,
    } from "carbon-components-svelte";
    import type { Member } from "..\\src\\back\\member.entity";
    import MemberInput from "./MemberInput.svelte";
    import Save20 from "carbon-icons-svelte/lib/Save20";
    import Rotate20 from "carbon-icons-svelte/lib/Rotate20";
    export let member: Member;

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
        right: -500px;
        bottom: 9vh;
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

    .rowInputWrapper {
        display: flex;
        align-items: center;
        min-width: 30vw;
    }
</style>

<div>
<Form>
<StructuredList style="width: 80%;">
    <StructuredListHead>
        <StructuredListRow head>
            <StructuredListCell head>Eingeschaft</StructuredListCell>
            <StructuredListCell head>Wert</StructuredListCell>
        </StructuredListRow>
    </StructuredListHead>
    <StructuredListBody>
        {#each member.iterable() as entries}
        <StructuredListRow>
            <StructuredListCell><p class="property">{entries.displayName}</p></StructuredListCell>
            <StructuredListCell>
                <div class="rowInputWrapper">
                    <MemberInput memberChild={entries} />
                    <Button style="display: none" iconDescription="Zurücksetzen" size="small" kind="tertiary" icon={Rotate20}></Button>
                </div>
            </StructuredListCell>
        </StructuredListRow>
        {/each}
    </StructuredListBody>
</StructuredList>
</Form>
</div>

<div id="saveButton"><Button on:click={triggerToast}><Save20/><span id="saveText">Speichern</span></Button></div>
<div id="saveToast" class="{isToastShown ? 'showToast' : ''}">
    <ToastNotification
    lowContrast
    hideCloseButton={true}
    kind="success"
    title="Gespeichert"
    subtitle="Ihre Änderungen wurden gespeichert."
    caption={new Date().toLocaleString()}
    />
</div>
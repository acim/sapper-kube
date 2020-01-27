<script>
  import { onMount } from "svelte";

  let items = [];
  let error;

  const request = async () => {
    try {
      const response = await fetch("pods", {
        headers: {
          "Content-Type": "application/json"
        }
      });
      items = await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  onMount(() => {
    request();
    console.log(items);
  });
</script>

<svelte:head>
  <title>sapper-kube</title>
</svelte:head>

<ul>
  {#each items as item}
    <li>{item.metadata.name}</li>
  {:else}No items{/each}
</ul>

{#if error}
{error}
{/if}
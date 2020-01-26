<script>
  import { onMount } from "svelte";

  let data;

  onMount(() => {
    try {
      data = JSON.parse(
        fetch("pods", {
          headers: {
            "Content-Type": "application/json"
          }
        })
      );
    } catch (e) {
      console.log(e);
    }
  });
</script>

<svelte:head>
  <title>sapper-kube</title>
</svelte:head>

<ul>
  {#each data as item}
    <li>item.name</li>
  {:else}No items{/each}
</ul>

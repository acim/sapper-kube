<script>
  import { onMount } from "svelte";

  let data;

  onMount(() => {
    data = fetch("pods", {
      headers: {
        "Content-Type": "application/json"
      }
    });
  });
</script>

<svelte:head>
  <title>sapper-kube</title>
</svelte:head>

<ul>
{#each JSON.parse(data) as item}
<li>item.name</li>
{/each}
</ul>
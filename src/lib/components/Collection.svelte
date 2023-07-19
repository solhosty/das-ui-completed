<script>
    import { onMount } from 'svelte';
    import { getCollection } from '$lib/util/collection';
    import { writable } from 'svelte/store';
  
    const collection = writable([]);
  
    onMount(async () => {
      collection.set(await getCollection());
    });
  </script>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
      {#each $collection as item (item.name)}
        {#if item.image}
          <div class="card bg-white shadow-md rounded-md p-4">
            <img class="card-img rounded-t-md" src={item.image} alt={item.name} />
            <div class="p-4">
              <h2 class="font-bold text-lg text-center mb-2">{item.name}</h2>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  
  
<script lang="ts">
  import { onMount, onDestroy, afterUpdate } from 'svelte';
  import { getCollection } from '$lib/util/collection';
  import { writable } from 'svelte/store';
  
  let observer: IntersectionObserver;
  interface CollectionItem {
    name: string;
    image: string;
  }
  
  const collection = writable<CollectionItem[]>([]);

  async function loadCollection() {
    const data = await getCollection();
    collection.set(data);
  }

  onMount(loadCollection);

  afterUpdate(() => {
    const images = document.querySelectorAll('.lazy');
    images.forEach(image => {
      observer.observe(image);
    });
  });

  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target as HTMLImageElement;
        lazyImage.src = lazyImage.dataset.src as string;
        lazyImage.classList.remove('lazy');
        observer.unobserve(lazyImage);
      }
    });
  });
  
  onDestroy(() => {
    if (observer) {
      observer.disconnect();
    }
  });
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
  {#each $collection as item}
    {#if item.image}
      <div class="card bg-white shadow-md rounded-md p-4">
        <img class="card-img rounded-t-md lazy" data-src={item.image} alt={item.name} />
        <div class="p-4">
          <h2 class="font-bold text-lg text-center mb-2">{item.name}</h2>
        </div>
      </div>
    {/if}
  {/each}
</div>

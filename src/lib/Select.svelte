<script>
  import { createEventDispatcher, onDestroy } from 'svelte'
  export let placeholder = ''
  const dispatch = createEventDispatcher()
  onDestroy(() => {})
</script>

<div class="select relative mb-40px" tabindex="-1">
  <button
    class="btn flex h-10 items-center justify-between select-none outline-none shadow-none inline-flex items-center justify-center rounded-md text-sm font-medium bg-#fff transition-colors border border-#e4e4e7 border-solid h-10 px-4 py-2 w-full max-w-md"
  >
    <span style="pointer-events:none">Select a font extension</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-4 w-4 opacity-50"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6"></path>
    </svg>
  </button>
  <ul
    class="list absolute p-[6px_16px] hidden top-105% w-100% bg-#fff border-rd-4px shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] border-1px border-solid border-#e4e4e7"
  >
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
  </ul>
  <!-- <div
    class="list absolute p-[6px_16px] hidden top-105% w-100% bg-#fff border-rd-4px shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] border-1px border-solid border-#e4e4e7"
  >
    123
  </div> -->
</div>

<style lang="postcss">
  .select {
    &:focus-within {
      .list {
        display: block;
      }
    }

    .list {
    }
  }
</style>

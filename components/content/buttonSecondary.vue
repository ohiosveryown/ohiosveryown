<template>
  <button class="sans" role="button">
    <span class="dot" />
    {{ label }}
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none">
      <g opacity=".56">
        <rect width="13" height="13" x=".5" y=".5" stroke="#000" rx="6.5" />
        <path
          fill="#000"
          d="M7.75 4.85c-.38 0-.67-.28-.67-.67s.29-.67.67-.67c.38 0 .67.28.67.67s-.29.67-.67.67Zm-1.57 5.64c-.34 0-.6-.18-.6-.59 0-.19.05-.43.17-.7L6.8 6.75c.12-.29.08-.43-.08-.43-.19 0-.4.23-.71.79l-.32-.1c.37-.81.83-1.47 1.47-1.47.35 0 .6.18.6.59 0 .19-.05.42-.17.7L6.54 9.28c-.12.29-.07.43.08.43.19 0 .4-.23.72-.79l.32.1c-.38.81-.84 1.47-1.48 1.47Z"
        />
      </g>
    </svg>
  </button>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  button {
    display: flex;
    align-items: center;
    gap: 5px;
    position: relative;
    border-radius: 200px;
    padding: 1.2rem 1.6rem 1.4rem;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1;
    overflow: hidden;
    cursor: url("https://ik.imagekit.io/ohiosveryown/ovo--3.7/cursor/cursor.png"),
      auto;
    cursor: -webkit-image-set(
        url("https://ik.imagekit.io/ohiosveryown/ovo--3.7/cursor/cursor.png") 1x,
        url("https://ik.imagekit.io/ohiosveryown/ovo--3.7/cursor/cursor@2x.png")
          2x,
        url("https://ik.imagekit.io/ohiosveryown/ovo--3.7/cursor/cursor@3x.png")
          3x
      ),
      auto;
    transition: background 200ms ease;
    /* transform: scale(4);
    transform-origin: top left; */
  }

  button:hover {
    background: #f7f7f7;
  }

  button:focus {
    outline: 1px solid rgba(0, 0, 0, 0.4);
  }

  .dot {
    border-radius: 100px;
    width: 8px;
    height: 8px;
    background: #4ed70e;
    filter: drop-shadow(0 3px 4px rgba(29, 167, 34, 0.24));
  }
</style>

<script>
  export default {
    props: {
      label: String,
    },
  }
</script>

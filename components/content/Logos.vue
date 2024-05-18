<template>
  <ul>
    <li v-for="logo in logos">
      <figure>
        <img class="icon" :src="logo.icon" :alt="logo.label" />
        <figcaption class="label">{{ logo.label }}</figcaption>
      </figure>
    </li>
    <li class="more sans">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="46"
        height="12"
        fill="none"
      >
        <path
          fill="#484848"
          fill-rule="evenodd"
          d="M4.25 5.75V9h1.5V5.75H9v-1.5H5.75V1h-1.5v3.25H1v1.5h3.25Z"
          clip-rule="evenodd"
        />
        <path
          fill="#484848"
          d="M42.465 9.062c-.71 0-1.33-.134-1.86-.403a2.965 2.965 0 0 1-1.221-1.222c-.286-.537-.43-1.192-.43-1.963 0-.72.144-1.343.43-1.872a2.989 2.989 0 0 1 1.196-1.235c.52-.286 1.122-.429 1.807-.429.633 0 1.2.143 1.703.429.511.286.91.68 1.196 1.183.286.503.429 1.075.429 1.716 0 .139-.013.316-.04.533h-5.732v-.897h4.55l-.338.156c0-.58-.16-1.04-.481-1.378-.32-.338-.758-.507-1.313-.507-.373 0-.702.074-.988.221a1.567 1.567 0 0 0-.65.65c-.156.286-.234.628-.234 1.027v.676c0 .433.082.806.247 1.118.173.312.407.55.702.715.303.165.646.247 1.027.247.303 0 .576-.056.819-.169.243-.113.442-.269.598-.468.165-.2.277-.425.338-.676h1.43a2.64 2.64 0 0 1-.56 1.378 3.01 3.01 0 0 1-1.17.871c-.458.2-.944.299-1.455.299ZM33.973 2.146h1.534l.052 2.093h.065c.104-.52.255-.936.455-1.248a1.87 1.87 0 0 1 .87-.715c.382-.156.867-.234 1.457-.234v1.339a5.745 5.745 0 0 0-1.235.182 2.102 2.102 0 0 0-.832.429 1.996 1.996 0 0 0-.598.91c-.122.381-.182.858-.182 1.43v2.522h-1.586V2.146ZM28.947 9.062a3.819 3.819 0 0 1-1.82-.442 3.425 3.425 0 0 1-1.313-1.248c-.32-.546-.481-1.179-.481-1.898 0-.702.16-1.317.48-1.846.33-.537.768-.953 1.314-1.248a3.819 3.819 0 0 1 1.82-.442c.659 0 1.26.147 1.807.442.554.295.992.71 1.313 1.248.32.529.48 1.144.48 1.846 0 .72-.16 1.352-.48 1.898-.32.537-.759.953-1.313 1.248a3.743 3.743 0 0 1-1.807.442Zm0-1.248c.399 0 .75-.091 1.053-.273.303-.182.537-.446.702-.793.164-.355.247-.78.247-1.274 0-.485-.083-.897-.247-1.235a1.715 1.715 0 0 0-.702-.78 2.007 2.007 0 0 0-1.053-.273c-.407 0-.763.091-1.066.273a1.716 1.716 0 0 0-.702.78c-.156.338-.234.75-.234 1.235 0 .494.078.919.234 1.274.165.347.399.611.702.793.303.182.659.273 1.066.273ZM13 2.146h1.534l.065 1.651h.078c.165-.598.442-1.057.832-1.378.399-.32.884-.481 1.456-.481.58 0 1.07.169 1.469.507.399.338.65.789.754 1.352h.117c.165-.598.45-1.057.858-1.378.407-.32.893-.481 1.456-.481.45 0 .85.104 1.196.312.347.2.615.485.806.858.19.373.286.802.286 1.287v4.459h-1.573V4.915c0-.52-.13-.927-.39-1.222-.26-.303-.615-.455-1.066-.455-.33 0-.615.087-.858.26-.243.173-.433.42-.572.741-.13.32-.195.698-.195 1.131v3.484h-1.586V4.915c0-.52-.13-.927-.39-1.222-.26-.303-.615-.455-1.066-.455-.312 0-.59.082-.832.247a1.643 1.643 0 0 0-.572.715c-.139.312-.208.689-.208 1.131v3.523h-1.586L13 2.146Z"
        />
      </svg>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  ul {
    display: flex;
    align-items: center;
    margin: 11.2rem auto 0;
  }

  li {
    position: relative;
    margin-right: -8px;
  }

  .icon {
    border-radius: 100px;
    border: 3px solid #fff;
    width: 3.4rem;
    transition: transform 200ms ease;
  }

  figure:hover {
    .icon {
      transform: translate(0, -0.6rem);
    }

    .label {
      opacity: 1;
    }
  }

  .label {
    position: absolute;
    top: -3.6rem;
    left: 50%;
    transform: translate(-50%, 0);
    width: max-content;
    transition: opacity 200ms ease;
  }

  .more {
    display: flex;
    align-items: center;
    gap: 2px;
    border-radius: 100px;
    border: 3.5px solid #fff;
    padding: 0.1rem 1.2rem 0 0.8rem;
    height: 3.6rem;
    background: #eaeaea;
  }
</style>

<script setup>
  const logos = ref([
    {
      label: "GitHub",
      icon: "https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/logos/logo__gh@3x.webp",
    },
    {
      label: "Mailchimp",
      icon: "https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/logos/logo__mc@3x.webp",
    },
    {
      label: "Intuit",
      icon: "https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/logos/logo__intuit@3x.webp",
    },
    {
      label: "Nike",
      icon: "https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/logos/logo__nike@3x.webp",
    },
    {
      label: "Microsoft",
      icon: "https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/logos/logo__microsoft@3x.webp",
    },
  ])
</script>

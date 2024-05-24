<template>
  <nav class="">
    <button role="button" class="theme-trigger">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
      >
        <path
          fill="#121214"
          fill-rule="evenodd"
          d="M19.968 10.802c-.264.02-.532.031-.801.031-5.523 0-10-4.477-10-10 0-.27.01-.537.031-.801C4.05.44 0 4.747 0 10c0 5.523 4.477 10 10 10 5.253 0 9.56-4.05 9.968-9.198Z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <div @mouseleave="menuOpen = false" class="navigation">
      <button role="button" class="sans" @click="menuOpen = !menuOpen">
        <span v-if="menuOpen" class="cloud">Close Menu</span>
        <span v-else class="gravity">Menu</span>
        <svg
          width="12"
          height="12"
          fill="none"
          class="arrow"
          :class="[menuOpen ? 'arrow-default' : 'arrow-flipped']"
        >
          <path
            fill="#000"
            fill-rule="evenodd"
            d="M5.444 0h1.112v7.848c.159-.243.331-.478.515-.702C8.043 5.97 9.435 5 11 5v1.111c-1.102 0-2.21.698-3.071 1.743-.862 1.044-1.373 2.311-1.373 3.257H5.444c0-.946-.511-2.213-1.373-3.257C3.21 6.809 2.101 6.11 1 6.11V5c1.565 0 2.957.969 3.929 2.146.184.224.356.459.515.702V0Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <menu ref="menu" class="menu" :class="[menuOpen ? 'opened' : 'closed']">
        <!-- <BlurTop /> -->
        <main>
          <ContentList>
            <ul v-for="post in posts" :key="post._path" :post="post">
              <li>
                <nuxtLink :to="post._path">
                  <header class="name sans">{{ post.name }}</header>
                  <p class="caption sans">{{ post.caption }}</p>
                </nuxtLink>
              </li>
            </ul>
          </ContentList>
          <!-- <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Exercitationem excepturi, doloremque totam labore aliquid quas
            quibusdam! Eum alias unde ex dolores. Minus nihil maxime laudantium
            aliquid eligendi! Unde, quod similique. Iste at labore, quia nisi
            voluptates temporibus minus repudiandae dolor, qui, quae suscipit
            facere? Suscipit asperiores facilis a iste quaerat, rerum eveniet
            natus id minima assumenda adipisci quia similique aliquid? Ex,
            accusamus repellendus dolore voluptas praesentium reiciendis iure
            exercitationem, atque accusantium excepturi deserunt veniam dolor
            voluptatibus! Quis molestiae repudiandae esse provident! Fugit
            suscipit pariatur ratione, doloremque expedita reiciendis neque
            harum. Vitae cupiditate nesciunt sed omnis et, sequi quia autem
            magni. Cupiditate minus qui ex quae non placeat corporis, incidunt
            expedita sapiente earum fugit aliquam in. Porro dolore inventore
            minima doloribus. Doloribus pariatur unde exercitationem doloremque
            sint. Necessitatibus cupiditate obcaecati maxime nam nemo minus
            placeat eius aliquid vitae, eligendi, praesentium quis distinctio
            doloribus deleniti, esse fugiat. Est corporis quas quia debitis.
            Ipsum, ipsam iste! Sequi porro optio asperiores praesentium
            voluptate dolorem, reprehenderit ipsum fugiat soluta, eius numquam
            molestiae quibusdam! Tenetur modi sunt repudiandae officiis odit
            nostrum ut magnam beatae amet illo. Reiciendis odit illum neque?
            Quidem quos aliquid, nobis soluta reiciendis recusandae, rem aut quo
            fugiat incidunt culpa eos eligendi dolorum dolores dolore! Eaque
            perspiciatis, nisi minima error perferendis atque mollitia.
            Voluptate, magnam veritatis maxime, nemo suscipit doloribus dolorem
            alias sit nostrum tenetur soluta omnis quis officia! Quo odit
            adipisci voluptatibus est dolor recusandae autem laborum, nisi
            animi, quidem, repellendus mollitia. Reiciendis officiis
            perspiciatis minus nemo odit commodi magnam, cum, at consectetur
            deleniti nesciunt temporibus consequatur sequi numquam. Eaque
            facilis eius, laborum expedita repellendus cum dolore possimus
            molestias rem ullam aliquid? Tempore nostrum pariatur similique.
            Repellat delectus, natus quidem dolorem, enim provident hic nemo
            illo voluptates suscipit totam repudiandae? Doloremque quos in
            consequatur rerum nihil possimus aliquid ex? Sunt, veritatis
            doloribus! Sit ipsa hic dolore quas placeat, ex temporibus
            blanditiis cumque. Sequi, vitae maiores! Explicabo veniam quibusdam
            voluptatibus! A soluta illo ipsam eaque illum, eos placeat deserunt
            hic similique magnam optio. Dolores nemo ratione eaque eos officia.
            Quia reprehenderit sequi recusandae aperiam blanditiis quibusdam?
            Optio, dicta. Voluptatem officia ab dicta totam, earum assumenda
            corporis sunt aliquid illo nulla nihil? Assumenda, quia. Corporis
            odit, cumque qui laudantium distinctio non libero hic culpa nam,
            reiciendis, reprehenderit eius explicabo! Cumque voluptate alias
            necessitatibus eos quis quo sequi corporis, facilis ab modi quidem
            voluptatibus esse. Animi mollitia fugit harum veritatis. Aliquid
            optio, corrupti dolorem placeat velit cum laborum provident totam
            voluptates est voluptatem quibusdam accusantium, harum dolorum nisi
            et? Voluptatem debitis consectetur dicta esse suscipit! Cupiditate
            deserunt atque eligendi, nulla a quidem doloremque amet, eos
            aspernatur maiores ullam obcaecati veniam hic suscipit dolorem earum
            sequi repudiandae quia quas fugit optio facere aliquid rem!
            Quibusdam, totam. Tenetur inventore ullam corporis recusandae quo
            sed eaque natus aspernatur a in, laborum neque debitis. Cupiditate
            molestias ipsam pariatur. Commodi iste ad unde dolorum laborum dolor
            maiores iusto eaque hic! Quia laborum, totam dolor est sapiente
            consectetur architecto a quo, eaque, fugit tempore eum quos neque ab
            perspiciatis. Magni veritatis perspiciatis magnam, possimus ut
            minima voluptatum dolor obcaecati. Neque, ab. Officiis
            exercitationem voluptates ipsa vitae qui voluptatibus recusandae
            deserunt deleniti alias adipisci. Sed, recusandae minus. At dolor
            consequuntur, atque quo ipsa repudiandae eaque incidunt sapiente,
            cum dicta optio earum architecto? Sed facere fugiat praesentium
            tempora a vero porro ab exercitationem culpa reiciendis corrupti eos
            ipsa reprehenderit, consequatur accusantium sequi ipsam illo
            officiis in molestiae laboriosam ut voluptate tempore. Iusto,
            maiores? Placeat tenetur architecto ipsa impedit ut quisquam libero
            tempora enim sit, maiores praesentium eaque dicta inventore quasi
            soluta ex, corporis nemo minus dolor sapiente nisi fugiat eum!
            Cumque, id ipsum?
          </p> -->
        </main>
        <!-- <BlurBtm /> -->
      </menu>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  li {
    margin-bottom: 4rem;
  }

  main {
    padding: 11.2rem 6.4rem 8rem;
  }

  nav {
    --unit: 4rem;
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: calc(var(--unit) / 2);
    z-index: var(--zmax);
    margin: var(--unit) auto 0;
    max-width: var(--max-width);
    width: calc(90vw + 2rem);
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    border-radius: 100px;
    padding: 1.2rem;
    backdrop-filter: blur(6px);
    font-size: 1.6rem;
    svg,
    path,
    span {
      cursor: pointer;
    }
  }

  svg {
    cursor: pointer;
    transition: 260ms ease transform;
  }

  svg.arrow-default {
    transform: scaleY(1);
    transform: rotate(-180deg);
    path {
      fill: var(--cloud);
    }
  }

  svg.arrow-flipped {
    transform: scaleY(-1);
    transform: rotate(0);
    path {
      fill: var(--gravity);
    }
  }

  .navigation {
    position: relative;
  }

  .menu {
    --unit: 0.8rem;
    position: fixed;
    top: 0;
    right: var(--unit);
    bottom: 0;
    z-index: var(--z0);
    margin: auto;
    border-radius: 11px;
    border: 0.5px solid rgba(76, 78, 81, 0.16);
    width: 98vw;
    height: calc(100vh - calc(var(--unit) * 2));
    color: var(--cloud);
    opacity: 1;
    overflow-y: scroll;
    transition: opacity 200ms ease, filter 260ms ease;
    background: url("https://ik.imagekit.io/ohiosveryown/ovo--3.7/menu__bg@3x.webp?updatedAt=1716327160174")
      no-repeat center center;
    background-size: cover;
    filter: blur(8px);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25),
      0 24px 158px 0px rgba(0, 0, 0, 0.12), 0 6px 34px 0px rgba(0, 0, 0, 0.07),
      0 2px 10px 0px rgba(0, 0, 0, 0.05);

    @include breakpoint(lg) {
      width: 44vw;
    }

    @include breakpoint(xl) {
      /* right: 2vw; */
    }
  }

  .opened {
    opacity: 1;
    filter: blur(0px);
  }

  .closed {
    opacity: 0;
    filter: blur(8px);
    pointer-events: none;
  }
</style>

<script setup lang="ts">
  let menuOpen = ref(true)
  const menu = ref(null)

  useHead({
    htmlAttrs: {
      class: computed(() => {
        if (menuOpen.value) return "locked"
        return ""
      }),
    },
  })

  const { data: posts } = await useAsyncData("posts", () =>
    queryContent().sort({ key: 1 }).find()
  )
</script>

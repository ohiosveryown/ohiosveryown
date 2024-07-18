<template>
  <menu>
    <header>
      <div class="content--main">
        <video
          playsinline
          controls
          src="https://ik.imagekit.io/ohiosveryown/ovo--3.7/about/os.mp4"
        />
      </div>
    </header>

    <footer>
      <div class="content--footer">
        <div class="padding">
          <div class="thumbnail"></div>
          <article>
            <span>Video travel guide</span><span>edition 3.7</span>
          </article>
          <figure class="icon">
            <svg
              width="12"
              height="12"
              fill="none"
            >
              <path
                fill="#fff"
                fill-rule="evenodd"
                d="M8.932.91a5.565 5.565 0 0 1 2.919-.121.197.197 0 0 1 .149.19v8.697c0 .056-.026.11-.07.145-.045.034-.102.047-.157.034a5.553 5.553 0 0 0-5.024 1.432.185.185 0 0 1-.204.045.185.185 0 0 1-.118-.173V2.627c0-.049.018-.097.05-.133A5.567 5.567 0 0 1 8.932.91ZM0 .978A.197.197 0 0 1 .15.788a5.56 5.56 0 0 1 5.374 1.71c.032.036.05.084.05.133v8.534a.185.185 0 0 1-.118.173.185.185 0 0 1-.204-.045A5.551 5.551 0 0 0 .227 9.86a.189.189 0 0 1-.157-.034.187.187 0 0 1-.07-.145V.978Z"
                clip-rule="evenodd"
              />
            </svg>
          </figure>
        </div>
      </div>
    </footer>
  </menu>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  menu {
    position: fixed;
    right: 1.2rem;
    bottom: 1.2rem;
    border-radius: 17px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    width: 32rem;
    padding: 0.8rem;
    height: auto;
    color: #fff;
    background: url("https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721263613/ovo-3.7/global/guide-bg_3x_hdm3kt.jpg")
      no-repeat center center;
    background-size: cover;
    box-shadow: var(--shadow--md);
    overflow: hidden;
  }

  .padding {
    padding: 0.5rem 0.8rem 0.5rem 0.5rem;
  }

  header {
    display: grid;
    grid-template-rows: 0fr;
    transition: all var(--ease--qubic);
    overflow: hidden;
  }

  .content--main {
    min-height: 0;
  }

  menu:hover header {
    grid-template-rows: 1fr;
  }

  video {
    border-radius: 9px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: var(--shadow--xl);
    overflow: hidden;
  }

  footer {
    display: grid;
    grid-template-rows: 1fr;
    border-radius: 9px;
    border: 0.5px solid rgba(255, 255, 255, 0.04);
    background: radial-gradient(
      41.96% 83.93% at 50.24% -15.18%,
      #555 0%,
      #141414 100%
    );
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.76),
      0px -1px 0px 0px #000 inset,
      0px 0.5px 1px 0px rgba(255, 255, 255, 0.56) inset;
    transition: all 1s ease;
  }

  .content--footer .padding {
    display: flex;
    align-items: center;
  }

  .content--footer article {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .content--footer .icon {
    display: grid;
    place-items: center;
    border-radius: 6px;
    border: 0.6px solid rgba(255, 255, 255, 0.14);
    width: 2.4rem;
    height: 2.4rem;
    background: rgba(255, 255, 255, 0.12);
  }
</style>

<script setup></script>

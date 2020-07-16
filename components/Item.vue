<template>
  <div class="tweet">
    <div class="box">
      <article class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img :src="tweet.img" alt="Image">
          </figure>
        </div>
        <div class="debug media-content">
          <div class="content">
            <p>
              <strong>{{tweet.name}}</strong> <small>{{tweet.handle}}</small>
              <br>
              {{tweet.tweet}}
            </p>
          </div>
            <div class="level-left">
              <a class="level-item">
                <span class="icon is-small"><i class="fas fa-heart"></i></span>
                <span class="likes">{{tweet.likes}}</span>
              </a>
            </div>
        </div>
      </article>
    </div>
  </div>
</template>


<style lang='scss' scoped>
  @import '../style/grid.scss';

  img {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: 40vw; height: 100vh;
    object-fit: cover;
    transition: all 400ms ease;
    opacity: 0;
  }

  .tweet:hover {
    img { opacity: 1; }
  }

  .media-content { width: max-content; }

</style>


<script>
  export default {
    props: {
      tweet: Object
    }
  }
</script>
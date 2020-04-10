<template>
  <div id="image">
    <main>
      <img class="shadow-lg" src="https://picsum.photos/1000/700" alt />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Et debitis explicabo perspiciatis ratione. Beatae vitae accusamus nostrum repellendus totam aliquid deserunt ipsa laborum voluptate porro! Ipsum aspernatur ipsam at. Placeat consequuntur, quae possimus pariatur hic adipisci soluta, eos iste quos vel laborum quo accusantium, qui aut libero nesciunt exercitationem provident. Harum provident ipsa nisi saepe magni molestiae explicabo iusto reiciendis commodi repellendus. Obcaecati dolorum, atque quis eligendi quo sint illum, sequi similique nisi fugit pariatur, deserunt fugiat vitae non voluptatem maxime iusto reiciendis magni in! Quam similique sed quo tenetur aut soluta aliquid minima ad repellendus delectus? Totam, quae commodi. Debitis assumenda consectetur aut inventore obcaecati perspiciatis veritatis rem consequatur nostrum? Esse repellendus, quidem reiciendis quo in amet aperiam consectetur, qui dolorem, perspiciatis excepturi? Sapiente quidem adipisci dolore rem suscipit rerum quas pariatur cumque voluptatibus, dignissimos tempore distinctio a facere mollitia est ratione cum doloremque itaque incidunt asperiores culpa, alias neque saepe error. Totam, cum ratione. Non libero facere, ducimus voluptates natus quam, fuga harum porro doloribus suscipit excepturi ipsum blanditiis eos rem voluptatum vel officiis illo a eligendi! Commodi, aperiam quae. Sequi qui quaerat eaque minus molestias tenetur voluptatum velit quod fugit, earum minima ipsam hic eligendi. Iure accusantium voluptate ipsam quisquam libero magni minus illo! Natus provident libero recusandae est eveniet ad quo neque iste molestias id ex maxime, unde animi eum, cupiditate accusantium aliquam eligendi aut quis aperiam soluta? Cupiditate quisquam ad dignissimos praesentium corporis! Quaerat corporis perspiciatis tempora possimus, vero ullam veniam commodi autem nulla ipsam enim, quas alias vitae nostrum vel facilis provident, tempore qui? Voluptatem excepturi aperiam nam ipsum, consequuntur facilis odio similique sequi. Illum consequatur consequuntur hic deleniti recusandae, voluptas omnis assumenda. Eos sunt dicta, vel velit, praesentium sed magni ea eum consequatur non voluptatem molestiae reprehenderit quidem quo! Rerum ullam doloribus, laudantium ipsam molestias animi. Et impedit vero ducimus eligendi quod saepe perferendis sunt autem facilis corporis aut veniam, dolor libero pariatur repudiandae voluptas ratione. Enim odio dolorem eum voluptatibus quibusdam saepe nulla dignissimos quae debitis illum nihil dolorum officiis, minima voluptas tenetur unde corrupti laboriosam maiores quia natus! Ratione voluptates corporis deserunt iste modi, dolorem exercitationem commodi officiis possimus distinctio quidem itaque laborum, fugiat illum totam! Quo, eaque totam. A expedita incidunt, doloribus ut voluptatem neque quidem repellat cupiditate rem laboriosam natus et libero in inventore enim pariatur vero laudantium voluptates voluptate ad tempore at fugiat? Incidunt sint sit voluptas numquam quasi, officia ipsam rem provident quod unde odio aut velit quas vitae expedita eius? Error possimus alias quasi saepe, nihil quos? Natus labore delectus modi quia id laudantium iure, quae enim provident minus necessitatibus obcaecati blanditiis sapiente repudiandae quas dignissimos sint aspernatur perferendis possimus ab illo quibusdam beatae? Voluptas hic cupiditate esse ducimus eum ratione, architecto recusandae magni officiis quibusdam amet possimus iste quo at repellendus beatae quis porro magnam nam aperiam non placeat provident, aliquam doloribus. Ipsa, laudantium? Itaque totam maxime accusamus numquam temporibus neque nostrum laudantium esse similique ex eius, quis quo molestiae quidem, dolor omnis magnam facilis?
    </main>
    <b-list-group>
      <b-list-group-item class="author-info">
        <b-avatar></b-avatar>
        <div>
          <h5>Author / {{ photosUploaded }} photos</h5>
          <b-button size="sm" class="rounded-pill">Follow</b-button>
          <b-button size="sm" class="rounded-pill" variant="success">Donate</b-button>
        </div>
      </b-list-group-item>
      <b-list-group-item class="vote-info">
        <b-button variant="success" size="sm" class="rounded-pill">Share</b-button>
      </b-list-group-item>
      <b-list-group-item class="other-info"></b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component/lib";
import Vue from "vue";

@Component
export default class ImageDetails extends Vue {
  photosUploaded = Math.floor(Math.random() * 100);
}
</script>

<style scoped>
hr {
  background-color: whitesmoke;
}

h5 {
  color: goldenrod;
  margin-bottom: 10px;
}

img {
  object-fit: contain;
  max-height: 600px;
  /* width: 100%; */
  max-width: 100%;
  min-width: 300px;
  /* height: auto; */
}

button {
  margin: 0px 5px;
}

#image {
  /* padding-top: 10px; */
  display: flex;
  flex-wrap: wrap;
}

#image > main {
  padding: 20px;
  width: 100%;
  flex: 3 1 0;
  display: flex;
  flex-direction: column;
  max-width: 1310px;
  /* align-items: center; */
}

#image > aside {
  padding: 20px;
  min-width: 200px;
  flex: 1 1 0;
  border-left: 1px solid whitesmoke;
}

[class$="-info"] {
  display: flex;
  background-color: rgb(7, 7, 59);
}

.author-info > * {
  margin-right: 10px;
}
</style>
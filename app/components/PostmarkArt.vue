<template>
  <!-- One postmark, drawn from the Figma tray (2414:3858) in its units:
       the frames are its vectors, the words are live text so each mark
       says where and when it was stamped. Inked unevenly: a gradient mask
       fades it from one side, in a direction set by its seed. -->
  <svg
    class="postmark"
    :class="{ 'is-even': even }"
    :viewBox="`${box.x} ${box.y} ${box.width} ${box.height}`"
    :width="box.width"
    :height="box.height"
    :style="{ color: ink ?? type.ink }"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient
        :id="`${uid}-fade`"
        :x1="fade.x1"
        :y1="fade.y1"
        :x2="fade.x2"
        :y2="fade.y2"
      >
        <stop
          offset="0"
          stop-color="#fff"
        />
        <stop
          offset="0.5"
          stop-color="#fff"
          stop-opacity="0.82"
        />
        <stop
          offset="1"
          stop-color="#fff"
          stop-opacity="0.35"
        />
      </linearGradient>
      <mask
        :id="`${uid}-ink`"
        maskUnits="userSpaceOnUse"
        :x="box.x - 2"
        :y="box.y - 2"
        :width="box.width + 4"
        :height="box.height + 4"
      >
        <rect
          :x="box.x - 2"
          :y="box.y - 2"
          :width="box.width + 4"
          :height="box.height + 4"
          :fill="`url(#${uid}-fade)`"
        />
      </mask>
      <template v-if="arcs.length">
        <path
          v-for="(arc, index) in arcs"
          :id="`${uid}-arc${index}`"
          :key="index"
          :d="arc"
        />
      </template>
    </defs>

    <g :mask="even ? undefined : `url(#${uid}-ink)`">
      <!-- Circle with waves -->
      <template v-if="type.id === 'classic'">
        <circle
          cx="22.8666"
          cy="23.9741"
          r="21.3186"
          stroke="currentColor"
          stroke-width="0.885"
        />
        <g
          stroke="currentColor"
          stroke-width="0.738"
        >
          <path
            v-for="y in [14.75, 18.07, 21.39, 24.71, 28.03, 31.35]"
            :key="y"
            :d="`M43.52 ${y}c2.62-1.11 5.25-1.11 7.87 0s5.25 1.11 7.87 0 5.25-1.11 7.87 0 5.25 1.11 7.87 0 5.25-1.11 7.87 0 5.25 1.11 7.87 0`"
          />
        </g>
        <text class="postmark__mono" font-size="5.16">
          <textPath
            :href="`#${uid}-arc0`"
            startOffset="50%"
            text-anchor="middle"
            >{{ words.place }}</textPath
          >
        </text>
        <text class="postmark__mono" font-size="4.79" letter-spacing="0.55">
          <textPath
            :href="`#${uid}-arc1`"
            startOffset="50%"
            text-anchor="middle"
            >{{ words.countryDotted }}</textPath
          >
        </text>
        <text
          class="postmark__mono"
          font-size="4.79"
          text-anchor="middle"
          dominant-baseline="central"
        >
          <tspan x="22.87" y="19.07">{{ words.dayMonth }}</tspan>
          <tspan x="22.87" y="24.1">{{ words.date.slice(-4) }}</tspan>
          <tspan x="22.87" y="29.13">{{ words.serial6 }}</tspan>
        </text>
      </template>

      <!-- Double ring with stars -->
      <template v-else-if="type.id === 'stars'">
        <circle
          cx="23.9738"
          cy="23.9738"
          r="21.7612"
          stroke="currentColor"
          stroke-width="0.738"
        />
        <circle
          cx="23.9754"
          cy="23.9754"
          r="15.2697"
          stroke="currentColor"
          stroke-width="0.443"
        />
        <path
          fill="currentColor"
          d="M5.534 22.5l.39.938 1.013.081-.772.662.236.988-.867-.53-.867.53.236-.988-.772-.662 1.013-.081.39-.938zM42.417 22.5l.39.938 1.013.081-.772.662.236.988-.867-.53-.867.53.236-.988-.772-.662 1.013-.081.39-.938z"
        />
        <text class="postmark__narrow" font-size="5.53" letter-spacing="0.3">
          <textPath
            :href="`#${uid}-arc0`"
            startOffset="50%"
            text-anchor="middle"
            >{{ words.place }}</textPath
          >
        </text>
        <text class="postmark__narrow" font-size="4.79" letter-spacing="0.5">
          <textPath
            :href="`#${uid}-arc1`"
            startOffset="50%"
            text-anchor="middle"
            >{{ words.countryShort }}</textPath
          >
        </text>
        <text
          class="postmark__narrow"
          font-size="6.27"
          letter-spacing="0.37"
          text-anchor="middle"
          dominant-baseline="central"
        >
          <tspan x="23.97" y="17.6">{{ words.dayMonth }}</tspan>
          <tspan x="23.97" y="23.9">{{ words.date.slice(-4) }}</tspan>
        </text>
        <text
          class="postmark__mono"
          x="23.97"
          y="30.9"
          font-size="4.79"
          text-anchor="middle"
          dominant-baseline="central"
        >
          {{ words.serial6 }}
        </text>
      </template>

      <!-- Dashed ring -->
      <template v-else-if="type.id === 'dashed'">
        <circle
          cx="23.976"
          cy="23.9741"
          r="21.3555"
          stroke="currentColor"
          stroke-width="0.811"
          stroke-dasharray="1.11 0.81"
        />
        <text class="postmark__mono" font-size="6.27" letter-spacing="0.23">
          <textPath
            :href="`#${uid}-arc0`"
            startOffset="50%"
            text-anchor="middle"
            >{{ words.place }}</textPath
          >
        </text>
        <text
          class="postmark__mono postmark__mono--light"
          font-size="4.79"
          letter-spacing="0.3"
        >
          <textPath
            :href="`#${uid}-arc1`"
            startOffset="50%"
            text-anchor="middle"
            >{{ words.serial6 }}</textPath
          >
        </text>
        <text
          class="postmark__mono"
          font-size="6.27"
          text-anchor="middle"
          dominant-baseline="central"
        >
          <tspan x="23.98" y="20.9">{{ words.dayMonth }}</tspan>
          <tspan x="23.98" y="27.2">{{ words.date.slice(-4) }}</tspan>
        </text>
      </template>

      <!-- Arrival triangle -->
      <template v-else-if="type.id === 'triangle'">
        <path
          d="M31.3507 2.21289L60.4886 49.4236H2.21289L31.3507 2.21289Z"
          stroke="currentColor"
          stroke-width="1.1065"
        />
        <path
          d="M31.3498 8.11523L54.5863 46.4739H8.11328L31.3498 8.11523Z"
          stroke="currentColor"
          stroke-width="0.479"
        />
        <rect
          x="10.9535"
          y="28.6586"
          width="40.793"
          height="8.33564"
          stroke="currentColor"
          stroke-width="0.516"
        />
        <g
          text-anchor="middle"
          dominant-baseline="central"
        >
          <text
            class="postmark__narrow"
            x="31.35"
            y="24.39"
            font-size="4.79"
            letter-spacing="0.55"
          >
            ARRIVED
          </text>
          <text
            class="postmark__narrow"
            x="31.35"
            y="32.9"
            font-size="6.27"
            letter-spacing="0.37"
          >
            {{ words.date }}
          </text>
          <text
            class="postmark__mono"
            x="31.35"
            y="40.36"
            font-size="3.32"
          >
            {{ words.place }}
          </text>
          <text
            class="postmark__mono"
            x="31.35"
            y="44.05"
            font-size="3.32"
          >
            {{ words.serial6 }}
          </text>
        </g>
      </template>

      <!-- Hello from -->
      <template v-else-if="type.id === 'hello'">
        <rect
          x="1.28958"
          y="1.29153"
          width="67.4965"
          height="35.7769"
          stroke="currentColor"
          stroke-width="1.1065"
        />
        <rect
          x="3.53966"
          y="3.54161"
          width="62.9968"
          height="31.2771"
          stroke="currentColor"
          stroke-width="0.443"
        />
        <g>
          <path
            d="M29.3996 25.5022C29.5315 25.4819 29.7292 25.5124 29.8408 25.5884C30.3987 25.9587 30.0132 26.6281 29.9017 27.0845C29.8712 27.2214 29.856 27.3634 29.8662 27.5054C29.8915 28.038 30.1603 28.4335 30.282 28.9407C30.3682 29.2906 30.3682 29.6202 30.1654 29.9397C29.998 30.1984 29.7039 30.4215 29.3945 30.4875C29.1511 30.5433 28.8975 30.4925 28.6896 30.3505C28.6287 30.31 28.578 30.2542 28.5172 30.2136C28.3397 30.1071 28.223 30.2998 28.0912 30.3911C27.9897 30.4621 27.8782 30.5128 27.7564 30.5433C27.3659 30.6295 27.0819 30.457 26.8132 30.2288C26.6762 30.1122 26.4987 30.3303 26.377 30.4114C26.2806 30.4773 26.1741 30.528 26.0575 30.5534C25.8394 30.599 25.6518 30.5534 25.4641 30.4418C25.4033 30.4013 25.3374 30.3404 25.2917 30.2897C25.2106 30.1883 25.1446 30.1883 25.0229 30.1883C24.1253 30.1832 24.1354 29.3515 24.4093 28.748C24.4904 28.5654 24.6223 28.3067 24.6831 28.1292C24.7288 27.9822 24.7541 27.8351 24.7491 27.6829C24.744 27.1504 24.4854 26.8512 24.4144 26.3542C24.3941 26.1919 24.4194 25.9992 24.531 25.8775C24.8049 25.558 25.3729 25.6189 25.6924 25.842C26.1133 26.1362 26.3567 26.0956 26.8233 26.0398C26.9805 26.0246 27.1428 26.0144 27.3 26.0094C27.442 26.0094 27.5891 26.0144 27.7311 26.0246C27.9542 26.0398 28.2078 26.0956 28.4208 26.0144C28.8113 25.8674 28.9432 25.558 29.3945 25.5073L29.3996 25.5022Z"
            stroke="currentColor"
            stroke-width="0.659"
          />
          <path
            fill="currentColor"
            d="M28.0556 29.0469H27.5485C27.4085 29.0469 27.2949 29.1604 27.2949 29.3004C27.2949 29.4405 27.4085 29.554 27.5485 29.554H28.0556C28.1957 29.554 28.3092 29.4405 28.3092 29.3004C28.3092 29.1604 28.1957 29.0469 28.0556 29.0469ZM26.7167 27.0177C27.2339 26.9822 27.31 27.4082 27.2897 27.7886C27.2745 28.1486 27.31 28.4073 26.8739 28.5341C26.5949 28.5696 26.3769 28.4326 26.3059 28.1689C26.2704 28.032 26.2856 27.8799 26.2805 27.7429C26.2704 27.3981 26.316 27.109 26.7167 27.0228V27.0177ZM28.7503 27.0177C29.293 26.9974 29.3335 27.4082 29.3234 27.7886C29.3132 28.1385 29.3487 28.4174 28.9025 28.5341C28.5322 28.5696 28.3091 28.3312 28.3142 28.0016C28.3243 27.6111 28.2127 27.1293 28.7503 27.0177Z"
          />
        </g>
        <g dominant-baseline="central">
          <text
            class="postmark__mono"
            x="35.04"
            y="8.4"
            font-size="4.06"
            letter-spacing="0.18"
            text-anchor="middle"
          >
            METER: {{ words.serial7 }}
          </text>
          <text
            class="postmark__narrow"
            x="35.04"
            y="17.6"
            font-size="11.8"
            letter-spacing="0.74"
            text-anchor="middle"
          >
            HELLO FROM:
          </text>
          <text
            class="postmark__mono"
            x="33"
            y="28.03"
            font-size="4.06"
            letter-spacing="0.18"
          >
            {{ words.place }}
          </text>
        </g>
      </template>

      <!-- Postage meter -->
      <template v-else-if="type.id === 'meter'">
        <g
          stroke="currentColor"
          stroke-width="0.59"
        >
          <path
            v-for="y in [13.28, 16.96, 20.65, 24.34, 28.03]"
            :key="y"
            :d="`M0 ${y}h25.82`"
          />
        </g>
        <rect
          x="27.6638"
          y="1.84344"
          width="33.195"
          height="36.1457"
          rx="1.84417"
          stroke="currentColor"
          stroke-width="0.738"
        />
        <circle
          cx="75.9808"
          cy="20.2855"
          r="13.3149"
          stroke="currentColor"
          stroke-width="0.664"
        />
        <g>
          <path
            d="M78.2307 25.3606C78.3592 25.3243 78.5594 25.3302 78.6796 25.392C79.2792 25.6911 78.9787 26.4034 78.924 26.8705C78.9106 27.0102 78.9129 27.1531 78.9405 27.2929C79.0312 27.8187 79.3468 28.1785 79.53 28.6673C79.6587 29.0043 79.6992 29.3317 79.537 29.674C79.4026 29.9514 79.1379 30.2092 78.8387 30.3128C78.6038 30.3981 78.3457 30.3789 78.1217 30.2635C78.0563 30.2306 77.9991 30.1815 77.9336 30.1487C77.7442 30.0647 77.6521 30.2705 77.5323 30.3773C77.4403 30.4603 77.3357 30.5244 77.2186 30.5696C76.8413 30.7033 76.5381 30.5669 76.243 30.3733C76.0927 30.2743 75.9432 30.5127 75.8323 30.6083C75.7447 30.6856 75.6451 30.7491 75.5324 30.7886C75.3214 30.8608 75.1294 30.8385 74.9293 30.7508C74.8639 30.718 74.7909 30.6656 74.7394 30.6209C74.6463 30.5301 74.5808 30.5382 74.4599 30.5532C73.5677 30.6585 73.4755 29.8312 73.6733 29.1981C73.7314 29.0068 73.8306 28.7337 73.8692 28.5499C73.8965 28.3982 73.9036 28.249 73.8798 28.0985C73.8093 27.5702 73.5156 27.3048 73.384 26.8199C73.3439 26.6612 73.3454 26.4667 73.4412 26.3321C73.6739 25.9811 74.2456 25.9717 74.5903 26.154C75.0446 26.3944 75.2814 26.3242 75.738 26.2114C75.8922 26.1769 76.0522 26.1469 76.2077 26.1225C76.3487 26.1051 76.4954 26.092 76.6377 26.0846C76.8612 26.0723 77.12 26.0965 77.3215 25.9897C77.6913 25.7956 77.7842 25.4722 78.2263 25.3663L78.2307 25.3606Z"
            stroke="currentColor"
            stroke-width="0.659"
          />
          <path
            fill="currentColor"
            d="M77.3317 29.0471L76.828 29.1094C76.6889 29.1267 76.5901 29.2534 76.6074 29.3925C76.6246 29.5316 76.7513 29.6304 76.8904 29.6132L77.3941 29.5508C77.5332 29.5336 77.632 29.4068 77.6148 29.2678C77.5976 29.1287 77.4708 29.0299 77.3317 29.0471ZM75.753 27.1983C76.2624 27.0994 76.3904 27.5132 76.417 27.8935C76.4462 28.253 76.5132 28.5055 76.0956 28.6851C75.823 28.7546 75.5895 28.6454 75.4866 28.3922C75.4345 28.2606 75.4309 28.1076 75.409 27.9722C75.3565 27.6309 75.3663 27.3382 75.7536 27.2033L75.753 27.1983ZM77.7729 26.9482C78.3094 26.8613 78.4002 27.2643 78.4369 27.6434C78.4699 27.9922 78.5394 28.2649 78.1105 28.4356C77.7472 28.5164 77.4962 28.3071 77.4607 27.979C77.4228 27.5899 77.2527 27.1251 77.7729 26.9482Z"
          />
        </g>
        <text class="postmark__mono" font-size="3.69" letter-spacing="-0.1">
          <textPath
            :href="`#${uid}-arc0`"
            startOffset="50%"
            text-anchor="middle"
            >{{ words.city }}</textPath
          >
        </text>
        <g
          text-anchor="middle"
          dominant-baseline="central"
        >
          <text
            class="postmark__narrow"
            font-size="4.43"
            letter-spacing="0.22"
          >
            <tspan x="44.26" y="7.4">OHIOSVERYOWN</tspan>
            <tspan x="44.26" y="11.6">POSTAGE PAID</tspan>
          </text>
          <text
            class="postmark__narrow"
            x="44.26"
            y="22.41"
            font-size="9.59"
            letter-spacing="0.37"
          >
            ¢ 00.29
          </text>
          <text
            class="postmark__mono postmark__mono--light"
            x="44.26"
            y="32.3"
            font-size="2.95"
          >
            METER {{ words.serial7 }}
          </text>
          <text
            class="postmark__mono"
            x="75.98"
            y="19.89"
            font-size="3.69"
          >
            {{ words.dayMonth }}
          </text>
        </g>
      </template>

      <!-- House mark -->
      <template v-else-if="type.id === 'house'">
        <circle
          cx="23.9738"
          cy="23.9738"
          r="21.6505"
          stroke="currentColor"
          stroke-width="0.959"
        />
        <circle
          cx="23.973"
          cy="23.975"
          r="20.5071"
          stroke="currentColor"
          stroke-width="0.295"
        />
        <g>
          <path
            d="M26.8439 13.5162C27.0237 13.4885 27.2934 13.53 27.4456 13.6337C28.2063 14.1386 27.6807 15.0514 27.5286 15.6738C27.4871 15.8606 27.4663 16.0542 27.4801 16.2478C27.5147 16.974 27.8813 17.5134 28.0472 18.205C28.1648 18.6821 28.1648 19.1317 27.8882 19.5673C27.66 19.92 27.2588 20.2243 26.837 20.3142C26.505 20.3903 26.1593 20.3211 25.8757 20.1275C25.7927 20.0722 25.7236 19.9961 25.6406 19.9408C25.3985 19.7956 25.2395 20.0584 25.0597 20.1828C24.9214 20.2797 24.7692 20.3488 24.6032 20.3903C24.0707 20.5079 23.6835 20.2727 23.3169 19.9615C23.1302 19.8025 22.8882 20.0998 22.7222 20.2105C22.5908 20.3004 22.4456 20.3696 22.2865 20.4041C21.9891 20.4664 21.7333 20.4041 21.4774 20.252C21.3944 20.1967 21.3045 20.1137 21.2423 20.0445C21.1316 19.9062 21.0417 19.9062 20.8757 19.9062C19.6517 19.8993 19.6655 18.7651 20.0389 17.9422C20.1496 17.6932 20.3294 17.3405 20.4124 17.0985C20.4746 16.8979 20.5092 16.6974 20.5023 16.4899C20.4954 15.7637 20.1427 15.3557 20.0458 14.678C20.0182 14.4567 20.0528 14.1939 20.2049 14.0279C20.5784 13.5922 21.3529 13.6752 21.7886 13.9795C22.3626 14.3806 22.6945 14.3253 23.3308 14.2492C23.5452 14.2285 23.7665 14.2146 23.9808 14.2077C24.1745 14.2077 24.375 14.2146 24.5687 14.2285C24.873 14.2492 25.2187 14.3253 25.5092 14.2146C26.0417 14.0141 26.2215 13.5922 26.837 13.5231L26.8439 13.5162Z"
            stroke="currentColor"
            stroke-width="0.659"
          />
          <path
            fill="currentColor"
            d="M25.012 18.3496H24.3204C24.1294 18.3496 23.9746 18.5044 23.9746 18.6954C23.9746 18.8864 24.1294 19.0412 24.3204 19.0412H25.012C25.2029 19.0412 25.3577 18.8864 25.3577 18.6954C25.3577 18.5044 25.2029 18.3496 25.012 18.3496ZM23.1862 15.5829C23.8916 15.5345 23.9954 16.1154 23.9677 16.6341C23.947 17.1251 23.9954 17.4778 23.4006 17.6507C23.0203 17.6991 22.7229 17.5124 22.6261 17.1528C22.5777 16.966 22.5984 16.7586 22.5915 16.5718C22.5777 16.1016 22.6399 15.7074 23.1862 15.5898V15.5829ZM25.9594 15.5829C26.6994 15.5552 26.7547 16.1154 26.7409 16.6341C26.727 17.1113 26.7755 17.4916 26.1669 17.6507C25.662 17.6991 25.3578 17.3741 25.3647 16.9245C25.3785 16.392 25.2264 15.7351 25.9594 15.5829Z"
          />
        </g>
        <text class="postmark__mono" font-size="4.43" letter-spacing="0.21">
          <textPath
            :href="`#${uid}-arc0`"
            startOffset="50%"
            text-anchor="middle"
            >OHIOSVERYOWN.CO</textPath
          >
        </text>
        <text class="postmark__mono" font-size="4.06" letter-spacing="0.56">
          <textPath
            :href="`#${uid}-arc1`"
            startOffset="50%"
            text-anchor="middle"
            >{{ words.place }}</textPath
          >
        </text>
        <g
          text-anchor="middle"
          dominant-baseline="central"
        >
          <text
            class="postmark__mono"
            x="23.97"
            y="25.42"
            font-size="3.69"
          >
            {{ words.date }}
          </text>
          <text
            class="postmark__mono"
            x="23.97"
            y="29.66"
            font-size="3.69"
          >
            {{ words.serial7 }}
          </text>
        </g>
      </template>

      <!-- Line cancel -->
      <template v-else-if="type.id === 'cancel'">
        <g
          stroke="currentColor"
          stroke-width="0.59"
        >
          <path
            v-for="y in [2.213, 5.164, 8.113]"
            :key="y"
            :d="`M0 ${y}c4.71-.61 9.43-.61 14.14 0s9.43.61 14.14 0 9.43-.61 14.14 0 9.43.61 14.14 0 9.43-.61 14.14 0 9.43.61 14.14 0`"
          />
        </g>
        <g dominant-baseline="central">
          <text
            class="postmark__mono"
            x="42.42"
            y="13.56"
            font-size="4.06"
            letter-spacing="0.18"
            text-anchor="middle"
          >
            ═══ {{ words.place }} ═══ {{ words.dateRoman }} ═══
          </text>
          <text
            class="postmark__mono"
            x="83.5"
            y="-1.19"
            font-size="4.06"
            letter-spacing="0.18"
            text-anchor="end"
          >
            {{ words.serial7 }}
          </text>
        </g>
      </template>

      <!-- Banner -->
      <template v-else-if="type.id === 'banner'">
        <!-- Figma 2440:10220, drawn at the tray's size (hence the scale):
             the ring stops either side of the ribbon, so nothing shows
             through it however the ink fades. -->
        <g
          transform="translate(0.286 0) scale(1.5625)"
          stroke="currentColor"
        >
          <path
            d="M8.53516 26.832C10.998 28.8009 14.1213 29.9781 17.5195 29.9781C20.9178 29.9781 24.0411 28.8009 26.5039 26.832"
            stroke-width="0.755"
          />
          <path
            d="M4.15984 20.959C3.48988 19.2969 3.12109 17.481 3.12109 15.5789C3.12109 7.62646 9.56786 1.17969 17.5204 1.17969C25.4729 1.17969 31.9196 7.62646 31.9196 15.5789C31.9196 17.4024 31.5807 19.1466 30.9624 20.7522"
            stroke-width="0.755"
          />
          <path
            d="M6.2832 18.5492L8.17163 16.8969C7.98361 15.559 8.08487 14.1964 8.46857 12.9011C8.85227 11.6057 9.50948 10.4078 10.3958 9.38816C11.2821 8.36856 12.3769 7.55103 13.6063 6.99078C14.8356 6.43054 16.1709 6.14063 17.5219 6.14062C18.8729 6.14063 20.2081 6.43054 21.4375 6.99078C22.6668 7.55103 23.7616 8.36856 24.648 9.38816C25.5343 10.4078 26.1915 11.6057 26.5752 12.9011C26.9589 14.1964 27.0602 15.559 26.8721 16.8969L28.7606 18.5492"
            stroke-width="0.614"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M0.761719 23.8421L4.06647 20.7734H30.9766L34.2813 23.8421L30.9766 26.9108H4.06647L0.761719 23.8421Z"
            stroke-width="0.614"
            stroke-linejoin="round"
          />
        </g>
        <text class="postmark__narrow" font-size="5.53" letter-spacing="0.37">
          <textPath
            :href="`#${uid}-arc0`"
            startOffset="50%"
            text-anchor="middle"
            >{{ words.placeLong }}</textPath
          >
        </text>
        <g
          text-anchor="middle"
          dominant-baseline="central"
        >
          <text
            class="postmark__narrow"
            x="27.66"
            y="26.81"
            font-size="7.38"
            letter-spacing="0.37"
          >
            {{ words.dateDots }}
          </text>
          <text
            class="postmark__narrow"
            x="27.66"
            y="37.3"
            font-size="5.53"
            letter-spacing="0.59"
          >
            {{ words.serial7 }}
          </text>
        </g>
      </template>

      <!-- Ohio burgee -->
      <template v-else-if="type.id === 'burgee'">
        <path
          d="M51.7305 6.96094L37.5137 17.3115L36.8994 17.7588L37.5137 18.2061L51.7305 28.5566L1.01074 34.4727V1.04492L51.7305 6.96094Z"
          stroke="currentColor"
          stroke-width="1.1065"
        />
        <path
          d="M27.0413 4.51367L18.8429 18.7138M11.6777 33.2827L14.02 29.2256"
          stroke="currentColor"
          stroke-width="1.1065"
        />
        <g>
          <path
            d="M13.5836 7.24189C13.7874 7.21054 14.0931 7.25757 14.2655 7.37513C15.1277 7.94729 14.532 8.98186 14.3596 9.68726C14.3126 9.89888 14.289 10.1183 14.3047 10.3378C14.3439 11.1607 14.7593 11.7721 14.9474 12.5559C15.0806 13.0967 15.0806 13.6061 14.7671 14.0999C14.5085 14.4996 14.0539 14.8445 13.5758 14.9464C13.1996 15.0326 12.8077 14.9542 12.4864 14.7347C12.3923 14.672 12.3139 14.5858 12.2199 14.5231C11.9456 14.3585 11.7653 14.6564 11.5615 14.7974C11.4048 14.9072 11.2323 14.9856 11.0442 15.0326C10.4407 15.1658 10.0018 14.8993 9.58641 14.5466C9.37479 14.3664 9.10047 14.7034 8.91237 14.8288C8.76345 14.9307 8.59886 15.0091 8.41859 15.0483C8.08157 15.1188 7.79158 15.0483 7.50158 14.8758C7.40753 14.8131 7.30564 14.7191 7.2351 14.6407C7.10969 14.4839 7.0078 14.4839 6.8197 14.4839C5.43242 14.4761 5.4481 13.1907 5.87134 12.258C5.99674 11.9759 6.20052 11.5761 6.29457 11.3018C6.36511 11.0745 6.4043 10.8472 6.39646 10.6121C6.38863 9.78915 5.9889 9.32672 5.87917 8.55863C5.84782 8.30782 5.88701 8.00999 6.05944 7.82188C6.48268 7.32811 7.3605 7.42216 7.85428 7.76702C8.50481 8.2216 8.88102 8.1589 9.60209 8.07269C9.84506 8.04918 10.0959 8.0335 10.3388 8.02566C10.5583 8.02566 10.7856 8.0335 11.005 8.04918C11.3499 8.07269 11.7418 8.1589 12.071 8.0335C12.6745 7.80621 12.8783 7.32811 13.5758 7.24973L13.5836 7.24189Z"
            stroke="currentColor"
            stroke-width="0.747"
          />
          <path
            fill="currentColor"
            d="M11.2206 12.7207H10.4368C10.2204 12.7207 10.0449 12.8962 10.0449 13.1126C10.0449 13.329 10.2204 13.5045 10.4368 13.5045H11.2206C11.437 13.5045 11.6125 13.329 11.6125 13.1126C11.6125 12.8962 11.437 12.7207 11.2206 12.7207ZM9.15248 9.5872C9.95193 9.53233 10.0695 10.1907 10.0381 10.7785C10.0146 11.335 10.0695 11.7347 9.39545 11.9307C8.96438 11.9855 8.62736 11.7739 8.51763 11.3664C8.46276 11.1547 8.48628 10.9196 8.47844 10.708C8.46276 10.175 8.5333 9.72827 9.15248 9.59503V9.5872ZM12.2954 9.5872C13.134 9.55584 13.1967 10.1907 13.1811 10.7785C13.1654 11.3193 13.2203 11.7504 12.5305 11.9307C11.9584 11.9855 11.6135 11.6172 11.6214 11.1077C11.637 10.5042 11.4646 9.75963 12.2954 9.5872Z"
          />
        </g>
        <g dominant-baseline="central">
          <text
            class="postmark__mono"
            x="5.62"
            y="21.88"
            font-size="2.95"
          >
            METER {{ words.serial7 }}
          </text>
          <text
            class="postmark__mono"
            x="5.62"
            y="25.69"
            font-size="3.69"
          >
            {{ words.date }}
          </text>
        </g>
      </template>
    </g>
  </svg>
</template>

<style scoped lang="scss">
  // Ink that didn't quite take: a tiling grain (Figma's NOISE on the
  // postmarks) masks out specks here and there. Drawn once as an image and
  // tiled, so it costs about nothing however many marks there are, unlike a
  // filter on each.
  $ink-grain: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  4.2 0 0 0 -1'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");

  .postmark {
    display: block;
    overflow: visible;
    mask-image: $ink-grain;
    mask-size: 16rem 16rem;

    &.is-even {
      mask-image: none;
    }
  }

  // Courier stands in for Figma's Courier Prime, and Blush, narrowed, for
  // Bebas Neue.
  .postmark__mono {
    fill: currentColor;
    font-family: Courier, monospace;
    font-weight: 700;

    &.postmark__mono--light {
      font-weight: 400;
    }
  }

  .postmark__narrow {
    fill: currentColor;
    font-family: 'blush', var(--system-font);
    font-weight: 600;
    text-transform: uppercase;
    font-variation-settings:
      'wdth' 75,
      'HGHT' 100;
  }

</style>

<script setup lang="ts">
  import {
    postmark,
    postmarkText,
    seeded,
    type Mark,
    type PostmarkType,
  } from '~/data/postmarks'

  const props = withDefaults(
    defineProps<{
      type: PostmarkType
      mark: Pick<Mark, 'at' | 'city' | 'region' | 'country' | 'seed'>
      serial: number
      // Clean, for picking one out (the tray and the preview under the
      // pointer): no uneven pressure, no grain.
      even?: boolean
      // Another ink than the type's own (the desk icon's green ring).
      ink?: string
    }>(),
    { even: false, ink: undefined },
  )

  const uid = useId()
  const type = computed(() => postmark(props.type))
  const box = computed(() => ({
    x: type.value.x ?? 0,
    y: type.value.y ?? 0,
    width: type.value.width,
    height: type.value.height,
  }))
  const words = computed(() =>
    postmarkText({ ...props.mark, id: props.serial }, props.serial),
  )

  // Heaviest on one side, fading across: any direction.
  const fade = computed(() => {
    const angle = seeded(props.mark.seed)() * Math.PI * 2
    const dx = Math.cos(angle) / 2
    const dy = Math.sin(angle) / 2
    return { x1: 0.5 - dx, y1: 0.5 - dy, x2: 0.5 + dx, y2: 0.5 + dy }
  })

  // Text round a ring, centred at the top (reading clockwise) or the
  // bottom (reading left to right, upright). `r` is the baseline's radius.
  function ring(cx: number, cy: number, r: number, side: 'top' | 'bottom') {
    const dx = r * Math.SQRT1_2
    const dy = r * Math.SQRT1_2
    return side === 'top'
      ? `M${cx - dx} ${cy + dy}A${r} ${r} 0 1 1 ${cx + dx} ${cy + dy}`
      : `M${cx - dx} ${cy - dy}A${r} ${r} 0 1 0 ${cx + dx} ${cy - dy}`
  }

  const arcs = computed(() => {
    switch (props.type) {
      case 'classic':
        return [ring(22.87, 23.97, 15.84, 'top'), ring(22.87, 23.97, 19.1, 'bottom')]
      case 'stars':
        return [ring(23.97, 23.97, 16.3, 'top'), ring(23.97, 23.97, 20.2, 'bottom')]
      case 'dashed':
        return [ring(23.98, 23.97, 14.78, 'top'), ring(23.98, 23.97, 19.8, 'bottom')]
      case 'meter':
        return [ring(75.98, 20.29, 9.08, 'top')]
      case 'house':
        return [ring(23.97, 23.97, 15.68, 'top'), ring(23.97, 23.97, 19.05, 'bottom')]
      case 'banner':
        return [ring(27.66, 24.34, 16.32, 'top')]
      default:
        return []
    }
  })
</script>

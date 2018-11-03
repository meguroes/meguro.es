<template>
  <nuxt-link 
    :to="path" 
    :class="$style.wrapper" >
    <div :class="$style.inner">
      {{ meetup.title }}
      {{ meetup.date | toJPDate }}
      {{ meetup.locationName }}
    </div>
</nuxt-link></template>

<script>
export default {
  props: {
    meetup: {
      type: Object,
      required: true
    }
  },
  computed: {
    path() {
      return `/meetup/${this.meetup.number}`
    }
  }
}
</script>
<style lang="scss" module>
.wrapper {
  position: relative;
  display: block;
  border-radius: 0 0 10px 0;
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: $BASE_BACKGROUND_COLOR;
  transition: 200ms background ease-in;

  @media screen and (max-width: 480px) {
    border: 1px dashed rgba($PRIMARY_LIGHTEN_2_COLOR, 0.8);
  }

  &:link,
  &:hover,
  &:active,
  &:visited {
    color: $BASE_FONT_COLOR;
    text-decoration: none;
  }

  &:hover {
    background: $PRIMARY_LIGHTEN_2_COLOR;
  }
}

.inner {
  padding: 0 1rem;
  @media screen and (max-width: 480px) {
    padding: 0 0.2rem;
  }
}

.meetupLink {
  font-size: $tiny-font-size;
  font-weight: bolder;
  padding: 0.1rem 0.2rem 0.1rem 0.1rem;
  background: $TERTIARY_DARKEN_2_COLOR;
  border-radius: 0 0 0.4rem 0;
  transition: 100ms background ease-in;

  &:link,
  &:hover,
  &:active,
  &:visited {
    color: $TERTIARY_LIGHTEN_2_COLOR;
    text-decoration: none;
  }

  &:hover {
    background: $TERTIARY_COLOR;
  }
}
</style>

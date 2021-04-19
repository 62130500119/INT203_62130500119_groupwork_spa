<template>
    <div class="resultcontainer">
        <li>
            <span class="text-white"><h3 class="middle">{{ sname }}'s pet</h3></span>
            <slot name="img"></slot>
            <div class="flex justify-between">
                <slot></slot>
            </div>
        </li>
    </div>
</template>

<script>
export default {
  name: 'ResultBox',
  props: {
    sname: String
  }
}
</script>
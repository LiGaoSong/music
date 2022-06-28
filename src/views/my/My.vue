<template>
  <div class="rank">
   <div class="calculator">
    <div class="result"  @keyup="showInfo">
        {{displayNumber}}
    </div>
      <button class="search-button" @click="append('+')">+</button>
      <button class="search-button" @click="append('-')">-</button>
      <button class="search-button" @click="append('*')">*</button>
      <button class="search-button" @click="append('/')">/</button>
      <button class="search-button" @click="append('=')">=</button>
      <button class="search-button" @click="append('.')">.</button>
      <button class="search-button" @click="append('1')">1</button>
      <button class="search-button" @click="append('2')">2</button>
      <button class="search-button" @click="append('3')">3</button>
      <button class="search-button" @click="append('4')">4</button>
      <button class="search-button" @click="append('5')">5</button>
      <button class="search-button" @click="append('6')">6</button>
      <button class="search-button" @click="append('7')">7</button>
      <button class="search-button" @click="append('8')">8</button>
      <button class="search-button" @click="append('9')">9</button>

   </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'


export default {
  name: 'Rank',
  setup() {
    const displayNumber = ref(0)

    const append = (num) =>{
      displayNumber.value = num
    }
    
    return{
      displayNumber,
      append,
    }
  }
}
</script>

<style lang="scss" scoped>
.calculator{
  display: flex;
  width: 250px;
  height: auto;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  .search-button{
    font-size: var(--text16);
    width: 70px;
    height: 70px;
    border-radius: 10px;
    background-color: #f1f1f1;
    border: none;
    margin: 0 10px 10px 0;
    cursor: pointer;
  }
  .result{
    background-color: #f1f1f1;
    border-radius: 10px;
    width: 210px;
    height: 50px;
    margin-bottom:10px;
    text-align: right;
    line-height: 50px;
    padding: 10px;
  }
}

</style>
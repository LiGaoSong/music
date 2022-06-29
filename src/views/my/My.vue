<template>
  <div class="rank">
   <div class="calculator">
    <div class="result"  @keyup="showInfo">
        {{displayNumber}}
    </div>
      <button class="search-button" @click="append('+')">+</button>
      <button class="search-button" @click="append('-')">-</button>
      <button class="search-button" @click="append('*')">×</button>
      <button class="search-button" @click="append('÷')">÷</button>
      <button class="search-button" @click="clean">AC</button>
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
      <button class="search-button" @click="append('0')">0</button>
      <button class="search-button" @click="equal">=</button>

   </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'


export default {
  name: 'Rank',
  setup() {
    const displayNumber = ref('0')
    const isEnterDecimal = ref(false) //判断一组数字之中是否有小数点
    const isAddOperator = ref(false) //判断是否点击了运算符号
    const isStarted = ref(false)//判断是否开始输入数字
    
    //判断是否是运算符号
    const isOperator = (pyload) => {
      return ['+', '-', '*', '/'].indexOf(pyload) > -1
    }

    //运算判断
    const append = (pyload) =>{
      //点击了数字0且不是运算符号时
     if(displayNumber.value === '0' && !isOperator(pyload)){
      //如果点击了小数点，则直接再‘0’后加上小数点
      if(pyload === '.'){
         displayNumber.value += '' + pyload
         isEnterDecimal.value = true
      }else{
        displayNumber.value = '' + pyload //否则显示数字等于点击的数字
      }
        isStarted.value = true
        return
     }

      //判单是否是数字
     if(!isOperator(pyload)){
      if(pyload === '.' && isEnterDecimal.value){
        return
      }
      
      if(pyload === '.'){
        isEnterDecimal.value = true
        isAddOperator.value = true//如果点击了小数点，则后面不可加上运算符
      }else{
         isAddOperator.value = false
      }
      displayNumber.value += '' + pyload
     }
     
      //如果点击了运算符，这在数字后面加上运算符
     if(isOperator(pyload)  && !isAddOperator.value){
         displayNumber.value += '' + pyload
         isEnterDecimal.value = false
         isAddOperator.value = true
     }

    }

    //点击'='时操作
    const equal = () => {
      let result = displayNumber.value.replace(new RegExp('÷', 'g'), '/')

      displayNumber.value = parseFloat(eval(result).toFixed(9)).toString()
      isEnterDecimal.value = false
      isAddOperator.value = false
    }  
    
    //点击AC清楚显示框内容
    const clean = () => {
      displayNumber.value = '0'
      isEnterDecimal.value = false
      isAddOperator.value = false
      isStarted.value = false
    }

    return{
      displayNumber,
      append,
      clean,
      equal
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
  font-size: var(--text18);
  .search-button{
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
button:active{
           box-shadow: -5px -5px 10px -5px rgba(255, 255, 255, 1) inset,5px 5px 10px -5px rgba(0, 0, 0, .3) inset;
       }

</style>
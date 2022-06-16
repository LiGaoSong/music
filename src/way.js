function numberChange (num) {
    let num1 = String(num).split("")
    if(num1.length <= 4){
      return num1
    }else{
      return num1.slice(0,num1.length-4).join("") + "万"
    }
}

export  default numberChange
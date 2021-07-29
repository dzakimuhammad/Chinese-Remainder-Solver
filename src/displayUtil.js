const display_m = (arr) =>{
  let displaym = [];
  let m = 1
  for(let i=0; i<arr.length; i++){
    if(i !== arr.length-1){
      displaym.push(arr[i].toString()+"×");
    }
    else{
      displaym.push(arr[i].toString())
    }
    m = m*arr[i]
  }
  displaym.push(" = ");
  displaym.push(m);
  return displaym;
}

const display_a = (arr) => {
  let displaya = [];
  for(let i=0; i<arr.length; i++){
    const sub = i+1;
    let text = "a"+sub.toString() + " = " + arr[i].toString();
    if(i!==arr.length-1){
      text = text+", ";
    }
    displaya.push(text);
  }
  return displaya;
}

const display_M = (arrmod, arrM) => {
  let displayM = [];
  let reducedM = [];

  for(let i=0; i<arrmod.length; i++){
    let reducedarr = [];
    for(let j=0; j<arrmod.length;j++){
      if(i!==j){
        reducedarr.push(arrmod[j]);
      }
    }
    reducedM.push(reducedarr);
  }

  for(let i=0; i<arrmod.length; i++){
    let text = "M"+(i+1).toString()+" = ";
    for(let j=0; j<reducedM[0].length; j++){
      if(j !== reducedM[0].length - 1){
        text = text + reducedM[i][j].toString() + "×";
      }
      else{
        text = text + reducedM[i][j].toString() + " = " + arrM[i].toString();
      }
    }

    if (i !== arrmod.length-1){
      text = text+", "
    }
    displayM.push(text);
  }
  return displayM;
}

const display_y = (arrmod, arrM, arry) => {
  let displayarr = [];
  for(let i=0; i<arrmod.length; i++){
    let text = "y"+(i+1).toString()+" = " + arry[i].toString() + " karena " + arrM[i].toString() +"×" + arry[i].toString() +" ≡ 1 (mod " + arrmod[i].toString() + ")";
    if (i !== arrmod.length-1){
      text = text+", "
    }
    displayarr.push(text);
  }
  return displayarr;
}

const display_x = (arr_a, arr_M, arr_y, x) => {
  let displayarr = ["x = "];
  for(let i=0; i<arr_a.length; i++){
    let text = arr_a[i].toString() + " × " + arr_M[i].toString() + " × " + arr_y[i].toString();

    if(i!== arr_a.length-1){
      text = text+" + ";
    }
    else{
      text = text + " = ";
    }
    displayarr.push(text);
  }
  displayarr.push(x.toString());
  return displayarr;
}

export {display_m, display_a, display_M, display_y, display_x};

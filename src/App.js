import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}))

function App() {
  const classes = useStyles()
  const [idValue, setIdVal] = useState({value: 1});
  const [inputFields, setInputFields] = useState([
    { id: 0, num: '', mod: '' },
  ]);
  const [results, setResults] = useState({show: false, x: 0, m: 0, a:[], M : [], y: []});

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    
    setInputFields(newInputFields);
  }

  const handleAddFields = () => {
    setIdVal({value: idValue.value + 1});
    console.log("Id: ", idValue.value)
    setInputFields([...inputFields, { id: idValue.value,  num: '', mod: '' }]);
  }

  const handleRemoveFields = id => {
    const values  = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }
  
  function modInverse(a, m){
    for(let x = 1; x < m; x++)
      if (((a % m) * x) % m === 1)
        return x;
  }

  const displayArray = (arr) =>{
    let displayArr = [];
    for(let i=0; i<arr.length; i++){
      if(i !== arr.length-1){
        displayArr.push(arr[i].toString()+",");
      }
      else{
        displayArr.push(arr[i].toString())
      }
    }
    return displayArr;
  }

  const handleCRT = () => {
    let m = 1;
    let num = [];
    let mod = [];
    let M = [] ;
    let y = [];
    let x =0;
    
    inputFields.forEach(item =>{
      num.push(parseInt(item.num));
      mod.push(parseInt(item.mod));
      m = m * item.mod; 
      M.push(1);
    });
    
    for(let i=0; i<inputFields.length; i++){
      for(let j=0; j<inputFields.length; j++){
        if(j!==i){
          M[i] = M[i]*mod[j];
        }
      }
    }

    for(let i=0; i<inputFields.length; i++){
      y.push(modInverse(M[i], mod[i]));
      x += num[i]*M[i]*y[i];
    }

    setResults({show: true, x:x%m, m: m, a: displayArray(num), M: displayArray(M), y: displayArray(y)});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCRT();
  };

  return (
    <Container>
      <h1>Chinese Remainder Solver</h1>
      <form className={classes.root} onSubmit={handleSubmit}>
        { inputFields.map(inputField => (
          <div key={inputField.id}>
            <span>x ≡</span> 
            <TextField
              style ={{width: '10%'}}
              name="num"
              value={inputField.num}
              size="small"
              onChange={event => handleChangeInput(inputField.id, event)}
            /> 
            <span>mod</span>
            <TextField
              name="mod"
              style ={{width: '10%'}}
              size="small"
              value={inputField.mod}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
            <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
              <RemoveIcon />
            </IconButton>
            <IconButton
              onClick={handleAddFields}
            >
              <AddIcon />
            </IconButton>
          </div>
        )) }
        <Button
          className={classes.button}
          variant="contained" 
          color="primary" 
          type="submit" 
          onClick={handleSubmit}
        >Submit</Button>
      </form>
      <div>
        <h1>Result :</h1>
        <h4>x ≡ &Sigma;a<sub>i</sub>M<sub>i</sub>y<sub>i</sub> (mod m)</h4>
        {results.show === true ?
          (<div>
            <p>m = {results.m}</p>
            <p>a<sub>i</sub> = [{results.a.map((number) => <span>{number}</span>)}]</p>
            <p>M<sub>i</sub> = {results.M.map((number) => number)}</p>
           <p>y<sub>i</sub> = {results.y.map((number) => number)}</p>
          </div>) : null
        }
        {results.show === true ?
          <h4>x ≡ {results.x} (mod {results.m}) </h4> :null
        }
      </div>
    </Container>
  );
}

export default App;

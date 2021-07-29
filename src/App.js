import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

import { makeStyles } from '@material-ui/core/styles';
import { display_m, display_a, display_M, display_y, display_x } from './displayUtil';

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

    setResults({show: true, x:display_x(num, M, y, x), m: display_m(mod), a: display_a(num), M: display_M(mod, M), y: display_y(mod, M, y)});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let process = true;
    inputFields.forEach((input) => {
      if(input.num === '' || input.mod === ''){
        process = false;
        alert("Tidak boleh ada input yang kosong!");
      }
    })

    if(process){
      handleCRT();
    }
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
        <h3>x ≡ &Sigma;a<sub>i</sub>M<sub>i</sub>y<sub>i</sub> (mod m)</h3>
        {results.show === true ?
          (<div>
            <p>m = {results.m.map((string) => string)}</p>
            <p>{results.a.map((string) => string)}</p>
            <p>{results.M.map((string) => string)}</p>
           <p>{results.y.map((string) => string)}</p>
          </div>) : null
        }
        <br></br>
        {results.show === true ?
          <div>
            <p>{results.x.map((string) => string)}</p>
            <h3>x ≡ {results.x[results.x.length-1] % results.m[results.m.length-1]} (mod {results.m[results.m.length-1]}) </h3>
          </div> :null
        }
      </div>
    </Container>
  );
}

export default App;

var _config = {
    recursive: {
        input: function(){
            return document.querySelector("#nights_input_recursive").value.split(',').map(e => Number(e));
        },
        loader: function(){
            return document.querySelector(".compute_processing.recursive");
        },
        result: function(){
            return document.querySelector(".compute_result.recursive");
        }
    },
    dynamic: {
        input: function(){
            return document.querySelector("#nights_input_dynamic").value.split(',').map(e => Number(e));
        },
        loader: function(){
            return document.querySelector(".compute_processing.dynamic");
        },
        result: function(){
            return document.querySelector(".compute_result.dynamic");
        }
    },
    expression: {
        input: function(){
            return document.querySelector("#nights_input_expression").value.split('|');
        },
        loader: function(){
            return document.querySelector(".compute_processing.expression");
        },
        result: function(){
            return document.querySelector(".compute_result.expression");
        }
    }
}

var expected_params_count = 5;
// generic findPath
function findPath(_type){
    console.log(_type);

    switch(_type){
        case 'dynamic': {
            // debugger
            _config.dynamic.loader().classList.remove('hide');
            _config.dynamic.result().classList.add('hide');
            var result = findPathDynamic(..._config.dynamic.input(),_config.dynamic.input()[3],_config.dynamic.input()[4],true,{});
            _config.dynamic.result().classList.remove('hide');
            _config.dynamic.result().innerText = "Paths " + result;
            _config.dynamic.loader().classList.add('hide');
            // debugger
            break;
        }
        case 'recursive': {
            // debugger
            _config.recursive.loader().classList.remove('hide');
            _config.recursive.result().classList.add('hide');
            var result = findPathRecursive(..._config.recursive.input(),_config.recursive.input()[3],_config.recursive.input()[4],true);
            _config.recursive.result().classList.remove('hide');
            _config.recursive.result().innerText = "Paths " + result;
            _config.recursive.loader().classList.add('hide');
            break;
        }
        case 'expression': {
            _config.expression.loader().classList.remove('hide');
            _config.expression.result().classList.add('hide');
            var result = findExpressionMaxSum(_config.expression.input()[0].split(',').map(_ => Number(_)),_config.expression.input()[1].split(','));
            _config.expression.result().classList.remove('hide');
            _config.expression.result().innerText = "" + result.expr + ' =  ' + result.sum;
            _config.expression.loader().classList.add('hide');
            break;
        }
        default: {
            console.log('default triggered');
        }
    }

}


function validateInput(inputs){
    return inputs.length == expected_params_count;
}

function findPathRecursive(length, width, days, row,col,prow,pcol,start){
    // debugger
    if (length == 0 || width == 0) return 0;
    // let _key = `${days},${row},${col},${prow},${pcol},${start}`;
    // if ( _key in memo) return memo[_key];
    if (days < 0) return 0
    if (prow == row && pcol == col && !start) return 0;//move to
    if ((col < 0 || col >= length || row < 0 || row >= width) && days >= 0){
        return 1;//out of the grid
    }

//     left,right,up,down
    var moves = findPathRecursive(length,width,days-1,row,col-1,row,col,false)+
                findPathRecursive(length,width,days-1,row,col+1,row,col,false) +
                findPathRecursive(length,width,days-1,row-1,col,row,col,false) +
                findPathRecursive(length,width,days-1,row+1,col,row,col,false)+
                findPathRecursive(length,width,days-1,row,col,row,col,false);
  
    return moves
    

}

function findPathDynamic(length, width, days, row,col,prow,pcol,start,memo){
    
    if (length == 0 || width == 0) return 0;
    let _key = `${days},${row},${col},${prow},${pcol},${start}`;
    if ( _key in memo) return memo[_key];
    if (days < 0) return 0
    if (prow == row && pcol == col && !start) return 0;//move to
    if ((col < 0 || col >= length || row < 0 || row >= width) && days >= 0){
        return 1;//out of the grid
    }

//     left,right,up,down
    var moves = findPathDynamic(length,width,days-1,row,col-1,row,col,false,memo)+
                findPathDynamic(length,width,days-1,row,col+1,row,col,false,memo) +
                findPathDynamic(length,width,days-1,row-1,col,row,col,false,memo) +
                findPathDynamic(length,width,days-1,row+1,col,row,col,false,memo)+
                findPathDynamic(length,width,days-1,row,col,row,col,false,memo);
    memo[_key] = moves;
    // debugger
    return memo[_key]

    

}

function findExpressionMaxSum(_digits,_operators){
    if (_operators.length == 1 && _digits.length ==2) {
        return { 
            expr: expressionToString(_digits,_operators),
            sum: evaluateSum(_digits, _operators)
        }
    }

    var max;

    for( const[_key,_value] of Object.entries(_operators)){

        var reduce_digits = _digits.filter((_d,_index)=>{
            // debugger
           return _index != Number(_key)+1;
        });

        var transformed_digits = reduce_digits.map((_d,_index)=>{
            if (_index != Number(_key)) return _d;
            else return { 
                expr: expressionToString([_digits[_key],_digits[Number(_key)+1]],[_operators[_key]]),
                sum: evaluateSum([_digits[_key],_digits[Number(_key)+1]], [_operators[_key]])
            }
        });

        var reduced_operators = _operators.filter((_op,_index)=>{
            // debugger
            if(_index !=Number( _key)) return _op;
        })


        var result = findExpressionMaxSum(transformed_digits,reduced_operators)

        if (!Number(_key)){
             max = result;
            }
        else 
            if (max.sum < result.sum) max = result;

        // console.log('results for',result);
    }

    console.log('Max value is ',max);
    return max;

}

function evaluateSum(_digits,_operators){
    var _digits = _digits.map((_) =>{
        return Number.isInteger(_)? _ : _.sum
    });
    switch (_operators[0]){
        case '-':{
            return _digits[0] - _digits[1]
            break;
        }
        case '+':{
            return _digits[0] + _digits[1]
            break;
        }
        case '*':{
            return _digits[0] * _digits[1]
            break;
        }
        case '/':{
            return _digits[0] / _digits[1]
            break;
        }
    }
}

function expressionToString(_digits,_operators){
    var __digits = _digits.map(_ => {
       if (Number.isInteger(_)){
            if (_ >=0) return ''+_; 
            else return `(${_})`
        }
        else
            return _.expr
    });

    return `(${__digits[0]} ${_operators[0]} ${__digits[1]})`;
}


(function(){
    console.log('testign')
//testing 
var tests = 0,passed = 0;

function assertEquals(expected,returned){
    console.log(`assertingEquals expected`,expected,' returned',returned);
    tests++;
    expected == returned ? passed++: null;
}

function runtest(){

    //[1,-2],[-] 3
    assertEquals(3,evaluateSum([1,-2],['-']))
    
    //[1,{expr: '1 + 1',sum: 2}],[-] -1
    assertEquals(-1,evaluateSum([1,{expr: '(1 + 1)',sum: 2}],['-']))

    assertEquals('(1 - (1 + 1))', expressionToString([1,{expr: '(1 + 1)',sum: 2}],['-']))
    
    console.log('states Test: ',tests,' passed: ',passed);
}

runtest();
})();


function setDisplayStyle(_style, _ref){
    ['button.flexbox','button.Grid'].forEach((_) => {
        document.querySelector(_).classList.remove('active');
    })
    _ref.classList.add('active');
    // alert('triggering style update')
    switch (_style){
        case 'flexbox': {
            document.querySelector('.window').classList.remove('grid');
            break;
        }
        case 'grid': {
            document.querySelector('.window').classList.add('grid');
            break;
        }
    }
}

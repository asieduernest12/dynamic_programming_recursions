body * {
    color: #122724;
}

.window {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
}

.col {
    background: #c06f6f;
    /* width: 48vw; */
    flex-grow: 1;
    height: 100%;
    display: flex;
    justify-content:center;
    align-content:center;
    -webkit-box-shadow: 2px 3px 12px 2px #000000;
    box-shadow: 2px 3px 12px 2px #00000;
    border-radius: 4px;
    overflow: hidden;
}

.col {
    margin: 0 15px;
}

.col_form {
    display:flex;
    flex-direction: column;
    margin:auto;
    width: 70%;
}

.form_header {
    color: #1d1414;
    margin-bottom: 1em;
}

.form_inputs input {
    width:100%;
    font-size:1.2em;
    display:block-inline;
    height:3em;
    border-radius: 4px;
    border: none;
}

.compute_and_results {
    margin-top: 1em;
    /* border: 1px solid; */
    height: 3em;
    display: flex;
    justify-content: space-between;
}

.form_compute_btn {
    height: 100%;
    width: 40%;
    background: #9EE493;
    border:none;
    border-radius: 4px;
    font-size: 1.3em;



}

.computes {
    background-color: #abc8c0;
    height: 100%;
    display: flex;
    align-items:center;
    width: 40%;
    justify-content:center;
    overflow: none;
    
}

.compute_processing {
    animation: ripple 700ms ease-in 1ms infinite alternate;
}


.compute_result.expression {
    width: auto;
    padding: 0 1.3em;
}
@keyframes ripple {
    from {
        opacity: 0;
    }

}

.hide {
    display:none;
}



body {
    padding: 1em;
    height: 94vh;
    display: flex;
    flex-direction: column;
}


.switch-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1em;
    height: 5vh;
}

.logo {
    font-size: 2em;
    color: #0a2463;
}


.style_btns {
    display: inherit;
    height: 100%;
}

button.Grid, button.flexbox {
    border: none;
    margin-left: 1em;
    background-color: #E2E2E2;
    border-radius: 4px;
    transition: color 200ms, background-color 200ms;
    
}

button.active {
    background-color: #c06f6f;
    color: white;

}

.window.grid {
    display: grid;
    height: 100%;
    grid-gap: 1em;
    grid-template-columns: 32% 32% 32%;
    grid-template-rows: 49% 49%;
    
}

.window.grid .col {
    height: 99%;
    /*     width: auto; */
    /*     margin: 0.5em 1em; */
}

.window.grid .col:nth-child(1) {
    grid-column-start:1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end:2;
}

.window.grid .col:nth-child(2) {
    grid-column-start: 3;
    grid-column-end: 4;
    /*     grid-row-end: 1; */
}

.window.grid .col:nth-child(3) {
    grid-row-start: 2;
    grid-row-end: 4;
    grid-column-start: 1;
    grid-column-end: 4;;
}


.col {
    transition: all 200ms;
}


@media only screen and (max-width: 750px) {
    .window {
        display: flex;
        flex-direction: column;
    }

    .col {
        height: 100vh;
        margin: 1em;
    }

   .window.grid {
       display: flex;
       
   } 

   .style_btns {
       visibility: hidden;
   }

}

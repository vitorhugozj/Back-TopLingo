'use strict'

const botao = document.getElementById('traduzir')
const tema = document.getElementById('escurecer')
const body = document.querySelector('body')
let escuro = false


// botao.onclick = verificartexto
//  audioSaida.onclick = falar
//  trocar.onclick = inverterIdioma
//  audioEntrada.onclick = ativarReconhecimento

function verificarSelect(){
    const select1 = document.getElementById('select1')
    const select2 = document.getElementById('select2')

    const select1Index = select1.selectedIndex
    let linguaTraduzir = select1.options[select1Index].value
    console.log(linguaTraduzir);

    const select2Index = select2.selectedIndex
    let linguaTraduzida = select2.options[select2Index].value
    console.log(linguaTraduzida);

    let opcoesSelects = [linguaTraduzir, linguaTraduzida]
    
    return opcoesSelects
    
}

tema.addEventListener('click', function(){

    mudarCores()
})

function mudarCores(){

    console.log('cores');
    if(escuro == false){
        escuro = true
        body.classList.remove('clarear')
        body.classList.add('escuro')
    } else {
        escuro = false
        body.classList.remove('escuro')
        body.classList.add('clarear')
    }

}




function verificartexto(){
    const texto = document.getElementById('texto').value

    if(texto == "Alice." || texto == 'Alice' || texto == 'ALICE'){
        mudarCores()
    } else {        
        traduzir()
    }
}

async function traduzir() {

    const linguas = verificarSelect()
    // console.log('pt');
    const texto = document.getElementById('texto').value;
    if(texto == null || texto == '') {
        alert('Escreva algo')
    } else {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=${linguas[0]}|${linguas[1]}`
        const response = await fetch(url);
        console.log(url);
        
    const data = await response.json();
    
    const traducao = data.responseData.translatedText;
    document.getElementById('impressao').innerText = traducao;
    }
}

function ativarReconhecimento() {

    const texto = document.getElementById('texto')

    console.log('ouvindo');

    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.continuous = true;

    recognition.onresult = function(event) {
        const resultado = event.results[event.results.length - 1][0].transcript;
        console.log('fala: ' + resultado);
        texto.textContent = resultado
        if(resultado == "Alice") {
            mudarCores()
        }
    };

    setTimeout(function() {
        recognition.stop();
        console.log('Reconhecimento de voz encerrado.');
    }, 10000); // 10s

    recognition.start();
}

document.addEventListener('DOMContentLoaded', function() {
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.continuous = true;

    recognition.onresult = function(event) {
        const resultado = event.results[event.results.length - 1][0].transcript;
        console.log('fala: ' + resultado);
        if(resultado == 'Natália.' || resultado == 'natalia' || resultado == 'Natália') {
            ativarReconhecimento();
        } else if (resultado == 'Para.' || resultado == 'para'){
            console.log('parou');
            ativarReconhecimento()
            recognition.stop()
        }
    };

    recognition.start();
});
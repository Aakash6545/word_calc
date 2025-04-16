document.addEventListener('DOMContentLoaded',function(){
    const textInput = document.getElementById("text-input");
    const calculateBtn = document.getElementById('calculate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const wordCount =  document.getElementById('word-count');
    const characterCount =  document.getElementById('character-count');
    const sentenceCount =  document.getElementById('sentence-count');

    function calculateStats(){
        const text = textInput.value.trim();
        const words = text ?text.split(/\s+/).filter(word => word.length>0):[];
        wordCount.textContent = words.length;
        characterCount.textContent = text.length;

        const sentences =  text ?text.split(".").filter(word => word.length>0):[];
        sentenceCount.textContent = sentences.length;

    }
    function clearText(){
        textInput.value ='';
        characterCount.textContent ='0';
        sentenceCount.textContent = '0';

    }
    calculateBtn.addEventListener('click',calculateStats);
    clearBtn.addEventListener('click',clearText);
})

document.addEventListener('DOMContentLoaded', function() {

    let stickers = [];
    
    for (let i = 1; i <= 18; i++) {
        stickers.push(`autumn (${i}).png`);
    }


    let randomSticker = stickers[Math.floor(Math.random() * stickers.length)];

 
    document.querySelector('#diaryEntry img').src = 'images/stickers/' + randomSticker;
});

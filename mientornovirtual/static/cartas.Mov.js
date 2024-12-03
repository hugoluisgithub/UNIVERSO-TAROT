document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll ('.card-deck img');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            if(this.classList.contains('card-selected')) {
                this.classList.remove('card-selected');
            }else {
                cards.forEach( innerCard => innerCard.classList.remove('card-selected'));
                this.classList.add('card-selected');
            }   
        });
    });
});
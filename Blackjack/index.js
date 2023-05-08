
        let players = document.querySelectorAll('.player');
        let deck = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        let cardValues = {'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10};

        function dealCards() {
            players.forEach(player => {
                let cards = player.querySelector('.cards');
                let total = player.querySelector('.total');
                let totalValue = 0;

                cards.innerHTML = '';

                for (let i = 0; i < 2; i++) {
                    let card = deck[Math.floor(Math.random() * deck.length)];
                    totalValue += cardValues[card];
                    cards.innerHTML += `<div class="card">${card}</div>`;
                }

                total.innerHTML = `Total: ${totalValue}`;
            });
        }

        document.querySelector('#deal').addEventListener('click', dealCards);

        dealCards();

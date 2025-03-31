<script>
    import { onMount } from "svelte";
    import { createDeck, drawCards } from "../lib/api";

    let deckId = "";
    let playerHand = [];
    let dealerHand = [];
    
    onMount(async () => {
        const deck = await createDeck();
        deckId = deck.deck_id;
        
        const playerCards = await drawCards(deckId, 2);
        const dealerCards = await drawCards(deckId, 2);
        
        playerHand = playerCards.cards;
        dealerHand = dealerCards.cards;
    });

    async function hit() {
        const newCard = await drawCards(deckId, 1);
        playerHand = [...playerHand, ...newCard.cards];
    }

    function calculateHandValue(hand) {
        let total = 0;
        let aces = 0;

        for (const card of hand) {
            if (card.value === "JACK" || card.value === "QUEEN" || card.value === "KING") {
                total += 10; // Les figures valent 10
            } else if (card.value === "ACE") {
                aces += 1; // Compter les As séparément
            } else {
                total += parseInt(card.value); // Convertir les valeurs numériques en entier
            }
        }

        // Gérer les As (1 ou 11)
        for (let i = 0; i < aces; i++) {
            if (total + 11 <= 21) {
                total += 11; // Ajouter 11 si cela ne dépasse pas 21
            } else {
                total += 1; // Sinon, ajouter 1
            }
        }

        return total;
    }

</script>

<h1>Blackjack</h1>

<h2>Croupier</h2>
<div class="hand">
    {#each dealerHand as card, i}
        {#if i === 0}
            <img src={card.image} alt={card.code} />
        {:else}
            <img src="https://deckofcardsapi.com/static/img/back.png" alt="Hidden Card" />
        {/if}
    {/each}

    <p>Valeur totale : {calculateHandValue(dealerHand)}</p>
</div>

<h2>Joueur</h2>
<div class="hand">
    {#each playerHand as card}
        <img class="card" src={card.image} alt={card.code} />
    {/each}
    
    <p>Valeur totale : {calculateHandValue(playerHand)}</p>

    <div class="controls">
        <button on:click={hit}>Tirer une carte</button>
        <button on:click={stand}>Rester</button>
    </div>
</div>
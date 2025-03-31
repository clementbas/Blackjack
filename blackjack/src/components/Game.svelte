<script>
    import { onMount } from "svelte";
    import { createDeck, drawCards } from "../lib/api";

    let deckId = "";
    let playerHand = [];
    let dealerHand = [];
    let dealerRevealed = false;
    
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

    async function stand() {
        dealerRevealed = true;
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

<div class="min-h-screen bg-[rgba(20,20,20,0.9)] text-white">
    <h1 class="text-3xl font-bold text-center py-4">Blackjack</h1>

    <h2 class="text-xl font-bold text-center mb-2">Croupier</h2>
    <div class="flex justify-center relative">
        {#each dealerHand as card, i}
            {#if i===0 && !dealerRevealed}
                <img class="w-30" src="https://deckofcardsapi.com/static/img/back.png" alt="Hidden Card" />
            {:else}
                <img class="w-30" src={card.image} alt={card.code} />
            {/if}
        {/each}
    </div>
    <p class="text-center mt-2">Valeur totale : {dealerRevealed ? calculateHandValue(dealerHand) : "?"}</p>

    <h2 class="text-xl font-bold text-center mt-6 mb-2">Joueur</h2>
    <div class="flex justify-center">
        {#each playerHand as card}
            <img class="w-30" src={card.image} alt={card.code} />
        {/each}
    </div>
    <p class="text-center mt-2">Valeur totale : {calculateHandValue(playerHand)}</p>

    <div class="controls mt-6 flex justify-center space-x-4">
        <button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" on:click={hit}>Tirer une carte</button>
        <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" on:click={stand}>Rester</button>
    </div>
</div>
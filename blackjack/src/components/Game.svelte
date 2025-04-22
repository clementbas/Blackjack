<script>
    import { onMount } from "svelte";
    import { createDeck, drawCards } from "../lib/api";

    let deckId = "";
    let playerHand = [];
    let dealerHand = [];

    let result = "";
    let showDealerCards = false;

    onMount(async () => {
        const deck = await createDeck();
        deckId = deck.deck_id;

        const playerCards = await drawCards(deckId, 2);
        const dealerCards = await drawCards(deckId, 2);

        playerHand = playerCards.cards;
        dealerHand = dealerCards.cards;

        // Check for initial Blackjack
        if (calculateHandValue(playerHand) === 21) {
            showDealerCards = true;
            result = "Blackjack ! Le joueur gagne immédiatement 🃏🎉";
        }
    });


    async function hit() {
        const newCard = await drawCards(deckId, 1);
        playerHand = [...playerHand, ...newCard.cards];

        const playerTotal = calculateHandValue(playerHand);
        if (playerTotal > 21) {
            showDealerCards = true; // Reveal dealer's cards too
            winner(); // Player busted
        }
    }

    async function stand() {
        showDealerCards = true;

        // Dealer draws cards until at least 17
        while (calculateHandValue(dealerHand) < 17) {
            const newCard = await drawCards(deckId, 1);
            dealerHand = [...dealerHand, ...newCard.cards];
        }

        winner(); // Check who wins
    }

    function winner() {
        const playerTotal = calculateHandValue(playerHand);
        const dealerTotal = calculateHandValue(dealerHand);

        if (playerTotal === 21 && playerHand.length === 2) {
            result = "Blackjack ! Le joueur gagne immédiatement 🃏🎉";
        } else if (playerTotal > 21) {
            result = "Le croupier gagne ! Le joueur a dépassé 21.";
        } else if (dealerTotal > 21) {
            result = "Le joueur gagne ! Le croupier a dépassé 21.";
        } else if (playerTotal > dealerTotal) {
            result = "Le joueur gagne !";
        } else if (dealerTotal > playerTotal) {
            result = "Le croupier gagne !";
        } else {
            result = "Égalité !";
        }
    }

    async function stand() {
        dealerRevealed = true;
    }

    function calculateHandValue(hand) {
        let total = 0;
        let aces = 0;

        for (const card of hand) {
            if (["JACK", "QUEEN", "KING"].includes(card.value)) {
                total += 10;
            } else if (card.value === "ACE") {
                aces += 1;
            } else {
                total += parseInt(card.value);
            }
        }

        for (let i = 0; i < aces; i++) {
            total += (total + 11 <= 21) ? 11 : 1;
        }

        return total;
    }
</script>

<h1 class="text-4xl font-bold text-center my-6">Blackjack</h1>

<h2 class="text-2xl font-semibold mb-2">Croupier</h2>
<div class="hand flex gap-2 flex-wrap items-center mb-4">
    {#each dealerHand as card, i}
        {#if showDealerCards || i === 0}
            <img class="w-24 h-auto rounded shadow-md" src={card.image} alt={card.code} />
        {:else}
            <img class="w-24 h-auto rounded shadow-md" src="https://deckofcardsapi.com/static/img/back.png" alt="Carte cachée" />
        {/if}
    {/each}
</div>

{#if showDealerCards}
    <p class="text-lg font-medium mb-6">Valeur totale : {calculateHandValue(dealerHand)}</p>
{/if}

<h2 class="text-2xl font-semibold mb-2">Joueur</h2>
<div class="hand flex gap-2 flex-wrap items-center mb-4">
    {#each playerHand as card}
        <img class="w-24 h-auto rounded shadow-md" src={card.image} alt={card.code} />
    {/each}
</div>

<p class="text-lg font-medium mb-4">Valeur totale : {calculateHandValue(playerHand)}</p>

<div class="controls flex gap-4 mb-6">
    <button
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
        on:click={hit}
        disabled={showDealerCards}
    >
        Tirer une carte
    </button>
    <button
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
        on:click={stand}
        disabled={showDealerCards}
    >
        Rester
    </button>
</div>

{#if result}
    <h3 class="text-xl font-bold text-center text-red-600">{result}</h3>
{/if}

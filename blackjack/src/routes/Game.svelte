<script>
    import { onMount } from "svelte";
    import { createDeck, drawCards } from "../lib/api";

    let deckId = "";
    let playerHand = [];
    let dealerHand = [];

    let result = "";
    let showDealerCards = false;
    let gameOver = false;

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
            result = "Blackjack! You win 🃏🎉";
            gameOver = true; 
        }
    });
    async function newGame() {
        const deck = await createDeck();  // Create a new deck
        deckId = deck.deck_id;  // Set the deck ID

        const playerCards = await drawCards(deckId, 2);  // Deal 2 cards to player
        const dealerCards = await drawCards(deckId, 2);  // Deal 2 cards to dealer

        // Reset the game state
        playerHand = playerCards.cards;
        dealerHand = dealerCards.cards;
        result = "";  // Clear the result message
        showDealerCards = false;  // Hide dealer's second card
        gameOver = false; 

        // Check for Blackjack after the new deal
        if (calculateHandValue(playerHand) === 21) {
            showDealerCards = true;
            result = "Blackjack! You win 🃏🎉";
            gameOver = true; 
        }
    }


    async function hit() {
        if (gameOver) return;
        const newCard = await drawCards(deckId, 1);
        playerHand = [...playerHand, ...newCard.cards];

        const playerTotal = calculateHandValue(playerHand);
        if (playerTotal > 21) {
            showDealerCards = true; // Reveal dealer's cards too
            winner(); // Player busted
        }
    }

    async function stand() {
        if (gameOver) return;
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

        
        if (playerTotal === 21 ) {
            result = "Blackjack! You win 🃏🎉";
        } else if (playerTotal > 21) {
            result = "💥 Bust! Dealer wins. You went over 21.";
        } else if (dealerTotal > 21) {
            result = "🎉 Dealer busts! You win!";
        } else if (playerTotal > dealerTotal) {
            result = "🏆 You win!";
        } else if (dealerTotal > playerTotal) {
            result = "😞 Dealer wins.";
        } else {
            result = "🤝 It's a draw!";
        }
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

<main>
<!-- Navbar -->
<nav class="w-full bg-gray-800 px-6 py-4 flex items-center justify-between shadow">
    <div class="flex items-center gap-4">
      <a
        href="/"
        class="text-blue-300 hover:text-blue-500 font-semibold px-3 py-1 rounded transition"
      >
        Home
      </a>
      <a
        href="/rules"
        class="text-blue-300 hover:text-blue-500 font-semibold px-3 py-1 rounded transition"
      >
        Rules
      </a>
    </div>
    <div>
      <a
        href="/login"
        class="text-blue-300 hover:text-blue-500 font-semibold px-3 py-1 rounded transition"
      >
        Login
      </a>
    </div>
  </nav>

<div class="min-h-screen flex items-center justify-center bg-gray-900">
    
    <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl">
      <h1 class="text-4xl font-bold text-center mb-8 text-white">Blackjack</h1>
  
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-2 text-blue-400">Croupier</h2>
        <div class="hand flex gap-2 flex-wrap items-center justify-center mb-4">
          {#each dealerHand as card, i}
            {#if showDealerCards || i === 0}
              <img class="w-24 h-auto rounded shadow-md" src={card.image} alt={card.code} />
            {:else}
              <img class="w-24 h-auto rounded shadow-md" src="https://deckofcardsapi.com/static/img/back.png" alt="Carte cachée" />
            {/if}
          {/each}
        </div>
        {#if showDealerCards}
          <p class="text-lg font-medium mb-6 text-gray-200">Card Total : {calculateHandValue(dealerHand)}</p>
        {/if}
      </div>
  
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-2 text-blue-400">Joueur</h2>
        <div class="hand flex gap-2 flex-wrap items-center justify-center mb-4">
          {#each playerHand as card}
            <img class="w-24 h-auto rounded shadow-md" src={card.image} alt={card.code} />
          {/each}
        </div>
        <p class="text-lg font-medium mb-4 text-gray-200">Card Total : {calculateHandValue(playerHand)}</p>
      </div>
  
      <div class="controls flex gap-4 mb-6 justify-center">
        <button
          class="bg-gray-700 border border-blue-600 text-blue-200 hover:bg-blue-700 hover:text-white px-4 py-2 rounded disabled:opacity-50 transition"
          on:click={hit}
          disabled={showDealerCards}
        >
          Hit
        </button>
        <button
          class="bg-gray-700 border border-blue-600 text-blue-200 hover:bg-blue-700 hover:text-white px-4 py-2 rounded disabled:opacity-50 transition"
          on:click={stand}
          disabled={showDealerCards}
        >
          Stand
        </button>
      </div>
  
      {#if result}
        <div
          class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          on:click={() => result = null}
        >
          <div
            class="bg-gray-900 rounded-lg p-8 shadow-2xl text-center space-y-4 w-[340px] min-h-[180px] flex flex-col justify-center items-center"
            on:click|stopPropagation
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <h3 id="modal-title" class="text-2xl font-semibold text-gray-100 break-words">{result}</h3>
            <button
              class="bg-gray-800 border border-gray-700 text-gray-200 hover:bg-gray-700 hover:text-white px-6 py-2 rounded-lg shadow transition duration-200 mt-4"
              on:click={newGame}
            >
              New Game
            </button>
          </div>
        </div>
      {/if}

    </div>
  </div>
  </main>
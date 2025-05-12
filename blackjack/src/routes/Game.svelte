<script>
    import { onMount } from "svelte";
    import { createDeck, drawCards } from "../lib/api";

    let deckId = "";
    let playerHand = [];
    let dealerHand = [];

    let result = "";
    let showDealerCards = false;
    let gameOver = false;
    let errorMessage = "";

    async function handleAsync(fn) {
      try {
        errorMessage = "";
        return await fn();
      } catch (err) {
        console.error(err);
        errorMessage = "Something went wrong. Please try again.";
        throw err;
      }
    }

  onMount(async () => {
    try {
      await handleAsync(async () => {
        const deck = await createDeck();
        if (!deck?.deck_id) throw new Error("Failed to create deck");
        deckId = deck.deck_id;

        const [playerCards, dealerCards] = await Promise.all([
          drawCards(deckId, 2),
          drawCards(deckId, 2)
        ]);

        if (!playerCards?.cards || !dealerCards?.cards) {
          throw new Error("Failed to deal initial cards");
        }

        playerHand = playerCards.cards;
        dealerHand = dealerCards.cards;

        checkInitialBlackjack();
      });
    } catch {
     
    }
  });

    async function newGame() {
    await handleAsync(async () => {
      const deck = await createDeck();
      if (!deck?.deck_id) throw new Error("Failed to create new deck");
      deckId = deck.deck_id;

      const [playerCards, dealerCards] = await Promise.all([
        drawCards(deckId, 2),
        drawCards(deckId, 2)
      ]);

      if (!playerCards?.cards || !dealerCards?.cards) {
        throw new Error("Failed to deal new cards");
      }

      resetGameState(playerCards.cards, dealerCards.cards);
      checkInitialBlackjack();
    });
  }


  async function hit() {
    if (gameOver) return;
    
    await handleAsync(async () => {
      const newCard = await drawCards(deckId, 1);
      if (!newCard?.cards) throw new Error("Failed to draw card");
      
      playerHand = [...playerHand, ...newCard.cards];
      const playerTotal = calculateHandValue(playerHand);
      
      if (playerTotal > 21) {
        showDealerCards = true;
        winner();
      }
    });
  }

  async function stand() {
    if (gameOver) return;

    await handleAsync(async () => {
      showDealerCards = true;
      let dealerTotal = calculateHandValue(dealerHand);

      while (dealerTotal < 17) {
        const newCard = await drawCards(deckId, 1);
        if (!newCard?.cards) throw new Error("Failed to draw dealer card");
        
        dealerHand = [...dealerHand, ...newCard.cards];
        dealerTotal = calculateHandValue(dealerHand);
      }

      winner();
    });
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

    function checkInitialBlackjack() {
    if (calculateHandValue(playerHand) === 21) {
      showDealerCards = true;
      result = "Blackjack! You win 🃏🎉";
      gameOver = true;
    }
  }

  function resetGameState(playerCards, dealerCards) {
    playerHand = playerCards;
    dealerHand = dealerCards;
    result = "";
    showDealerCards = false;
    gameOver = false;
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
      {#if errorMessage}
        <div 
          class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          on:click={() => errorMessage = ""}
        >
          <div 
            class="bg-red-800 text-white rounded-lg p-6 shadow-lg text-center min-w-[250px]"
            on:click|stopPropagation
          >
            <div>{errorMessage}</div>
            <button
              class="mt-4 bg-white text-red-800 px-4 py-2 rounded hover:bg-red-100"
              on:click={() => errorMessage = ""}
            >
              Dismiss
            </button>
          </div>
        </div>
      {/if}


    </div>
  </div>
  </main>
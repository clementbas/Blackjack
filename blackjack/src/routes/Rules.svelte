<div class="min-h-screen flex items-center justify-center bg-gray-900">
    <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl">
      <h1 class="text-2xl font-bold text-white text-center mb-6">Blackjack Rules</h1>
      <ul class="text-gray-200 space-y-4">
        <li>
          <strong class="text-blue-400">Goal:</strong>
          <span> Get as close to 21 as possible without going over. Beat the dealer’s hand.</span>
        </li>
        <li>
          <strong class="text-blue-400">Card Values:</strong>
          <ul class="list-disc list-inside ml-4 mt-1 space-y-1">
            <li>Number cards are worth their number.</li>
            <li>Face cards (J, Q, K) are worth 10.</li>
            <li>Aces are worth 1 or 11 (whichever is better for your hand).</li>
          </ul>
        </li>
        <li>
          <strong class="text-blue-400">How to Play:</strong>
          <ul class="list-decimal list-inside ml-4 mt-1 space-y-1">
            <li>Both player and dealer get two cards. One of the dealer’s cards is hidden.</li>
            <li>Player goes first and can “Hit” (take a card) or “Stand” (end turn).</li>
            <li>If the player goes over 21, they bust and lose.</li>
            <li>Once the player stands, the dealer reveals the hidden card and must hit until reaching at least 17.</li>
            <li>If the dealer busts, the player wins.</li>
            <li>If neither busts, the closest to 21 wins. Ties are a “push” (no one wins).</li>
          </ul>
        </li>
      </ul>
      <div class="flex flex-col sm:flex-row gap-4 justify-center mt-10">
        <a
          href="/"
          class="bg-gray-700 hover:bg-blue-700 text-blue-200 font-semibold px-6 py-2 rounded-lg transition text-center border border-blue-600"
        >
          Home
        </a>
        <a
          href="/game"
          class="bg-gray-700 hover:bg-blue-700 text-blue-200 font-semibold px-6 py-2 rounded-lg transition text-center border border-blue-600"
        >
          Start Game
        </a>
      </div>
    </div>
  </div>
  
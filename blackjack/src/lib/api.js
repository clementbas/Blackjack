const API_LINK = "https://deckofcardsapi.com/api/deck/";

export async function createDeck() {
    const res = await fetch(`${API_LINK}new/shuffle/?deck_count=1`);
    return res.json();
}

export async function drawCards(deckId, count = 2) {
    const res = await fetch(`${API_LINK}${deckId}/draw/?count=${count}`);
    return res.json();
}

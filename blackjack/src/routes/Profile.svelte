<script>
    // Mock user data (replace with real data from your backend)
    let username = "Player123";
    let profilePic = "https://i.pravatar.cc/100?u=Player123"; // placeholder avatar
  
    let wins = 12;
    let losses = 8;
    let draws = 3;
  
    // For editing
    let newUsername = username;
    let newPassword = "";
    let confirmPassword = "";
    let newProfilePic = null;
    let profilePicPreview = profilePic;
  
    // Derived stats
    $: totalGames = wins + losses + draws;
    $: winRate = totalGames > 0 ? ((wins / totalGames) * 100).toFixed(1) : 0;
  
    // Handlers (replace with real API calls)
    function saveProfile() {
      if (newPassword && newPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      username = newUsername;
      if (newProfilePic) {
        profilePic = profilePicPreview;
      }
      // Reset password fields
      newPassword = "";
      confirmPassword = "";
      alert("Profile updated! (This is a mockup, connect to backend for real changes.)");
    }
  
    function handleProfilePicChange(event) {
      const file = event.target.files[0];
      if (file) {
        newProfilePic = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          profilePicPreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  
    function logout() {
      // Here you would clear auth tokens, session, etc.
      alert("Logged out! (Implement real logout logic here)");
      // Optionally redirect to home or login page
      // window.location.href = "/"; // Uncomment to redirect
    }
  </script>

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
  </nav>
  
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-900">
    <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl mt-8 mb-8">
      <h1 class="text-2xl font-bold text-white text-center mb-8">Profile</h1>
      
      <!-- User Info & Edit Form -->
      <div class="flex flex-col items-center mb-8">
        <img src={profilePicPreview} alt="Profile picture" class="w-24 h-24 rounded-full mb-4 shadow" />
        <form class="space-y-4 w-full max-w-md" on:submit|preventDefault={saveProfile}>
          <div>
            <label class="block text-gray-300 mb-1">Username:</label>
            <input
              type="text"
              bind:value={newUsername}
              required
              class="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-gray-300 mb-1">New Password:</label>
            <input
              type="password"
              bind:value={newPassword}
              placeholder="Leave blank to keep current"
              class="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-gray-300 mb-1">Confirm Password:</label>
            <input
              type="password"
              bind:value={confirmPassword}
              placeholder="Repeat new password"
              class="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-gray-300 mb-1">Profile Picture:</label>
            <input
              type="file"
              accept="image/*"
              on:change={handleProfilePicChange}
              class="block w-full text-gray-300"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Save Changes
          </button>
        </form>
      </div>
  
      <!-- Stats Table -->
      <div class="mt-4">
        <h2 class="text-xl font-semibold text-blue-400 mb-4 text-center">Your Blackjack Stats</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-gray-700 rounded-lg shadow">
            <tbody class="text-gray-200">
              <tr>
                <td class="py-2 px-4 font-semibold">Total games played</td>
                <td class="py-2 px-4 text-right">{totalGames}</td>
              </tr>
              <tr>
                <td class="py-2 px-4 font-semibold">Wins</td>
                <td class="py-2 px-4 text-right">{wins}</td>
              </tr>
              <tr>
                <td class="py-2 px-4 font-semibold">Losses</td>
                <td class="py-2 px-4 text-right">{losses}</td>
              </tr>
              <tr>
                <td class="py-2 px-4 font-semibold">Draws (Pushes)</td>
                <td class="py-2 px-4 text-right">{draws}</td>
              </tr>
              <tr>
                <td class="py-2 px-4 font-semibold">Win rate</td>
                <td class="py-2 px-4 text-right">{winRate}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  
    <!-- Logout Button at the very bottom with extra top margin -->
    <button
      on:click={logout}
      class="w-full max-w-2xl mt-4 mb-8 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition shadow"
    >
      Log out
    </button>
  </div>
  
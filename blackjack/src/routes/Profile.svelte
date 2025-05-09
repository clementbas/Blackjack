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
  
  <main>
    <h1>Profile</h1>
    <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
      <!-- Profile Info & Edit Form -->
      <section style="flex: 1; min-width: 250px;">
        <img src={profilePicPreview} alt="Profile picture" width="100" height="100" style="border-radius: 50%; margin-bottom: 1rem;" />
        <form on:submit|preventDefault={saveProfile}>
          <div>
            <label>
              Username:
              <input type="text" bind:value={newUsername} required />
            </label>
          </div>
          <div>
            <label>
              New Password:
              <input type="password" bind:value={newPassword} placeholder="Leave blank to keep current" />
            </label>
          </div>
          <div>
            <label>
              Confirm Password:
              <input type="password" bind:value={confirmPassword} placeholder="Repeat new password" />
            </label>
          </div>
          <div>
            <label>
              Profile Picture:
              <input type="file" accept="image/*" on:change={handleProfilePicChange} />
            </label>
          </div>
          <button type="submit">Save Changes</button>
        </form>
        <button on:click={logout} style="margin-top:1rem; background:#f44; color:white; border:none; padding:0.5rem 1rem; border-radius:5px; cursor:pointer;">
          Log out
        </button>
      </section>
  
      <!-- Stats -->
      <section style="flex: 1; min-width: 250px;">
        <h2>Your Blackjack Stats</h2>
        <ul>
          <li><strong>Total games played:</strong> {totalGames}</li>
          <li><strong>Wins:</strong> {wins}</li>
          <li><strong>Losses:</strong> {losses}</li>
          <li><strong>Draws (Pushes):</strong> {draws}</li>
          <li><strong>Win rate:</strong> {winRate}%</li>
        </ul>
      </section>
    </div>
  </main>
  
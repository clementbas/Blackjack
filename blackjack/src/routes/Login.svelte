<script>
    let username = "";
    let password = "";
  
    function login() {
      // Replace with your authentication logic
      alert(`Logging in as ${username} (mockup)`);
    }
  </script>
  
  <div class="min-h-screen flex items-center justify-center bg-gray-900">
    <form
      class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm"
      on:submit|preventDefault={login}
    >
      <h2 class="text-2xl font-bold text-white text-center mb-6">Sign in to your account</h2>
      <div class="mb-4">
        <label class="block text-gray-300 mb-1" for="username">Username</label>
        <input
          id="username"
          type="text"
          class="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          bind:value={username}
          required
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-300 mb-1" for="password">Password</label>
        <input
          id="password"
          type="password"
          class="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          bind:value={password}
          required
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
      >
        Sign In
      </button>
    </form>
  </div>
  
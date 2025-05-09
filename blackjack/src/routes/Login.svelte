<script>
    let username = "";
    let password = "";
  
    function login() {
      // Replace with your authentication logic
      alert(`Logging in as ${username} (mockup)`);
    }
  </script>
  
  <div class="min-h-screen bg-gray-900 flex flex-col">
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
  
    <!-- Centered Login Form with spacing above and below -->
    <div class="flex-1 flex items-center justify-center">
      <form
        class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm mt-8 mb-8"
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
        <a
          href="/sign-in"
          class="block text-blue-400 hover:underline text-base mt-2 text-center"
        >
          Don't have an account yet? Create one here
        </a>
      </form>
    </div>
  </div>
  
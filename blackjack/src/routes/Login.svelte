<script>
  let email = "";
  let password = "";
  let errorMessage = "";

  async function login() {
    errorMessage = "";
    try {
      const res = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        errorMessage = data.error || "Login failed.";
        return;
      }

      // Save token (for example, in localStorage)
      localStorage.setItem("token", data.token);

      // Redirect or update UI
      window.location.href = "/"; // or your dashboard route
    } catch (err) {
      errorMessage = "Network error. Please try again.";
      console.error(err);
    }
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
      {#if errorMessage}
        <div class="bg-red-700 text-white p-2 mb-4 rounded text-center">
          {errorMessage}
        </div>
      {/if}
      <form
        class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm mt-8 mb-8"
        on:submit|preventDefault={login}
      >
        <h2 class="text-2xl font-bold text-white text-center mb-6">Sign in to your account</h2>
        <div class="mb-4">
          <label class="block text-gray-300 mb-1" for="username">Email</label>
          <input
            id="username"
            type="text"
            class="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            bind:value={email}
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
          Log In
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
  
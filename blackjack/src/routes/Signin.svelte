<script>
  let username = "";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let errorMessage = "";
  let successMessage = "";

  async function signup() {
    errorMessage = "";
    successMessage = "";

    if (password !== confirmPassword) {
      errorMessage = "Passwords do not match!";
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        errorMessage = data.error || "Registration failed.";
        return;
      }

      successMessage = "Registration successful! You can now log in.";
      // Optionally, redirect after a delay:
      // setTimeout(() => window.location.href = "/login", 1500);
    } catch (err) {
      errorMessage = "Network error. Please try again.";
      console.error(err);
    }
  }
</script>

  
  <!-- Navbar -->
<nav class="w-full bg-gray-800 px-6 py-4 flex items-center justify-between shadow ">
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

  <div class="min-h-screen flex items-center justify-center bg-gray-900">
    {#if errorMessage}
        <div class="bg-red-700 text-white p-2 mb-4 rounded text-center">
          {errorMessage}
        </div>
      {/if}
      {#if successMessage}
        <div class="bg-green-700 text-white p-2 mb-4 rounded text-center">
          {successMessage}
        </div>
      {/if}
    <form
      class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm"
      on:submit|preventDefault={signup}
    >
      <h2 class="text-2xl font-bold text-white text-center mb-6">Create your account</h2>
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
      <div class="mb-4">
        <label class="block text-gray-300 mb-1" for="email">Email</label>
        <input
          id="email"
          type="email"
          class="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          bind:value={email}
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-300 mb-1" for="password">Password</label>
        <input
          id="password"
          type="password"
          class="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          bind:value={password}
          required
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-300 mb-1" for="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          class="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          bind:value={confirmPassword}
          required
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
      >
        Sign Up
      </button>
      <a
    href="/login"
    class="text-blue-400 hover:underline text-base mt-2"
  >
    Already have an account? Sign In
  </a>
    </form>
    
  </div>
  
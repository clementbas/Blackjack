<script>import "./app.css";
import { Router, route } from "@mateothegreat/svelte5-router";
import Home from './routes/Home.svelte';
import Game from './routes/Game.svelte';
import Rules from "./routes/Rules.svelte";
import Profile from "./routes/Profile.svelte";
import Login from "./routes/Login.svelte";
import Signin from "./routes/Signin.svelte";


// Define your routes
const routes = [
  {
    path: "/",      // Home page
    component: Home
  },
  {
    path: "/game",  // Game page
    component: Game
  },
  {
    path: "/rules",
    component: Rules
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/sign-in",
    component: Signin
  }
];</script>
  
  
  <Router {routes}></Router>
  

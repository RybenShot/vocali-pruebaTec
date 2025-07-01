<template>
  <nav class="fixed top-0 left-0 right-0 bg-green-600 text-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">

        <!-- boton de menú -->
        <button @click="$emit('toggle-sidebar')"
          class="inline-flex items-center justify-center p-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-600 focus:ring-white" >

          <span class="sr-only">Open menu</span>
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Logo -->
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-center">
          <p class="text-xl font-bold">Vocalid</p>
        </div>

        <!-- boton de login -->
        <SignedOut>
          <div class="flex items-center">
            <SignInButton class="icon-btn button is-info mx-2"/>
          </div>
        </SignedOut>

        <SignedIn>
          <h1 class="title has-text-white my-1">
            <UserButton /> 
            {{user?.username || user?.firstName || 'Usuario' }}
          </h1>
        </SignedIn>

      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useUser } from '@clerk/vue'

const { user } = useUser()
</script>
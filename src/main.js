import './style.css'

document.querySelector('#app').innerHTML = `
  <main class="min-h-screen bg-slate-950 text-white">
    <section class="flex min-h-screen items-center justify-center px-6">
      <div class="text-center">
        <h1 class="text-5xl font-bold tracking-tight">
          Hello Tequia
        </h1>

        <p class="mt-4 text-lg text-slate-400">
          Mi espacio en internet.
        </p>

        <button
          class="mt-8 rounded-lg bg-indigo-600 px-6 py-3 font-medium transition hover:bg-indigo-500"
        >
          Funciona
        </button>
      </div>
    </section>
  </main>
`
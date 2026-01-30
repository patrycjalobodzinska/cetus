import React from 'react';

export default function Hero2() {
  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Lewa strona - Treść */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 relative z-10">
        {/* Tło z napisem CETUSPRO (tylko na lewej połowie, subtelniej) */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
            <span className="text-[20vw] md:text-[12vw] font-black text-gray-50 opacity-80 -rotate-90 md:rotate-0 tracking-wider whitespace-nowrap">
            CETUSPRO
            </span>
        </div>

        <div className="flex flex-col gap-8 max-w-xl relative z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 w-fit">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span className="text-sm font-medium text-blue-700">Nowa jakość usług</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-gray-900 tracking-tight">
            Tworzymy <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              przyszłość
            </span> <br/>
            Twojego biznesu
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            Odkryj potencjał nowoczesnych technologii. Pomagamy firmom rosnąć, automatyzować procesy i zdobywać przewagę na rynku dzięki dedykowanym rozwiązaniom.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40">
              Rozpocznij współpracę
            </button>
            <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors border border-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
              </svg>
              Zobacz demo
            </button>
          </div>

          <div className="mt-8 flex items-center gap-4 text-sm text-gray-500 border-t border-gray-100 pt-8">
            <div className="flex -space-x-3">
               {[1,2,3,4].map((i) => (
                 <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-400">
                    U{i}
                 </div>
               ))}
            </div>
            <p>Zaufało nam już <span className="font-bold text-gray-900">500+</span> firm</p>
          </div>
        </div>
      </div>

      {/* Prawa strona - Obraz na pełną wysokość */}
      <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen relative bg-gray-900">
        <img
            src="/cetus.png"
            alt="Cetus"
            className="absolute inset-0 w-full h-full object-cover scale-x-[-1] opacity-90"
        />
        {/* Gradient overlay żeby tekst był czytelniejszy jeśli coś na niego najdzie, lub po prostu dla stylu */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
}

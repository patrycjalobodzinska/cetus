import {
  Lock, Wallet, MessageCircle, Map, BarChart, Palette,
  Shield, Users, Zap
} from 'lucide-react';

export const renderModuleMockup = (moduleIndex: number) => {
  switch(moduleIndex) {
    case 0:
      return (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all cursor-pointer">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">f</span>
                </div>
                <div className="h-2 bg-white/30 rounded flex-1"></div>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all cursor-pointer">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-gray-800 text-xs font-bold">G</span>
                </div>
                <div className="h-2 bg-white/30 rounded flex-1"></div>
              </div>
              <div className="flex items-center justify-center space-x-2 mt-4 p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                <Shield className="w-5 h-5 text-green-400" />
                <div className="h-2 bg-green-400/50 rounded w-24"></div>
              </div>
            </div>
          </div>
        </div>
      );

    case 1:
      return (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6">
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-4 shadow-lg">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-8 bg-yellow-400/30 rounded"></div>
                  <Wallet className="w-5 h-5 text-white/70" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-white/30 rounded w-3/4"></div>
                  <div className="h-2 bg-white/20 rounded w-1/2"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/10 rounded-lg p-3 flex items-center justify-center">
                  <div className="h-2 bg-blue-400 rounded w-16"></div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 flex items-center justify-center">
                  <div className="h-2 bg-cyan-400 rounded w-16"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 2:
      return (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6">
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-blue-400 rounded-full shrink-0"></div>
                <div className="flex-1">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="h-2 bg-white/30 rounded w-full mb-1"></div>
                    <div className="h-2 bg-white/20 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-2 flex-row-reverse">
                <div className="w-8 h-8 bg-cyan-400 rounded-full shrink-0"></div>
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-3 ml-auto" style={{ width: '80%' }}>
                    <div className="h-2 bg-white/40 rounded w-full mb-1"></div>
                    <div className="h-2 bg-white/30 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between bg-red-500/20 rounded-lg p-3 border border-red-500/30">
                <MessageCircle className="w-5 h-5 text-red-400" />
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
              </div>
            </div>
          </div>
        </div>
      );

    case 3:
      return (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6">
            <div className="relative bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-lg p-4 h-40">
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-1 p-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-white/5 rounded"></div>
                ))}
              </div>
              <div className="absolute top-8 left-8">
                <Map className="w-6 h-6 text-red-400 animate-bounce" />
              </div>
              <div className="absolute bottom-8 right-8">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="flex space-x-2 mt-3">
              <div className="bg-blue-500 text-white rounded px-3 py-1 text-xs font-bold">PL</div>
              <div className="bg-white/10 text-white/50 rounded px-3 py-1 text-xs">EN</div>
              <div className="bg-white/10 text-white/50 rounded px-3 py-1 text-xs">DE</div>
            </div>
          </div>
        </div>
      );

    case 4:
      return (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6">
            <div className="flex items-end justify-between h-32 mb-4">
              <div className="flex flex-col items-center space-y-1">
                <div className="w-12 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t" style={{ height: '60%' }}></div>
                <div className="h-1.5 bg-white/20 rounded w-12"></div>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <div className="w-12 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t" style={{ height: '85%' }}></div>
                <div className="h-1.5 bg-white/20 rounded w-12"></div>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <div className="w-12 bg-gradient-to-t from-teal-500 to-teal-400 rounded-t" style={{ height: '45%' }}></div>
                <div className="h-1.5 bg-white/20 rounded w-12"></div>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <div className="w-12 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t" style={{ height: '70%' }}></div>
                <div className="h-1.5 bg-white/20 rounded w-12"></div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <BarChart className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                <div className="h-2 bg-blue-400/50 rounded w-full"></div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <Users className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                <div className="h-2 bg-cyan-400/50 rounded w-full"></div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <Zap className="w-5 h-5 text-teal-400 mx-auto mb-1" />
                <div className="h-2 bg-teal-400/50 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      );

    case 5:
      return (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between bg-white/10 rounded-lg p-4 mb-3">
              <div className="flex items-center space-x-3">
                <Palette className="w-5 h-5 text-blue-400" />
                <div className="h-2 bg-white/30 rounded w-20"></div>
              </div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-white rounded-full"></div>
                <div className="w-8 h-8 bg-gray-800 rounded-full border-2 border-blue-500"></div>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-2 bg-white/30 rounded w-3/4"></div>
                  <div className="h-2 bg-white/20 rounded w-1/2"></div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-white/10 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

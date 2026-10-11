import React from 'react';
import { Candidate, SwapRequest } from '../types';
import { 
  ArrowLeftRight, 
  Users, 
  FileText, 
  GitFork, 
  MapPin, 
  Search, 
  PlusCircle, 
  CheckCircle,
  Building2,
  ShieldCheck,
  SendHorizontal
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'matcher' | 'directory' | 'chains' | 'matrix' | 'requests';
  setActiveTab: (tab: 'matcher' | 'directory' | 'chains' | 'matrix' | 'requests') => void;
  currentUser: Candidate | null;
  onOpenProfile: () => void;
  onOpenAddModal: () => void;
  swapRequestsCount: number;
  totalCandidates: number;
  directMatchesCount: number;
  threeWayChainsCount: number;
  onSelectCandidateForMatch: (candidate: Candidate) => void;
  allCandidates: Candidate[];
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenProfile,
  onOpenAddModal,
  swapRequestsCount,
  totalCandidates,
  directMatchesCount,
  threeWayChainsCount,
  onSelectCandidateForMatch,
  allCandidates,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showSearchDropdown, setShowSearchDropdown] = React.useState(false);

  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allCandidates
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.applicationNo.toLowerCase().includes(q) ||
          c.homeDistrict.toLowerCase().includes(q) ||
          c.postingPlace.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [searchQuery, allCandidates]);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Govt of Bihar Brand Bar */}
      <div className="bg-emerald-900 text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-emerald-950">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>बिहार सरकार | स्वास्थ्य विभाग (Health Department, Govt. of Bihar)</span>
          </div>
          <span className="hidden sm:inline text-emerald-300">·</span>
          <span className="hidden md:inline text-emerald-200">
            आदेश सं० 6बी/एन-01-32/2026-880(6B) | विज्ञापन 23/2025
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-emerald-200 hidden sm:inline">
            स्टॉफ नर्स ग्रेड 'A' पारस्परिक स्थानांतरण सुविधा
          </span>
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1 text-emerald-200 hover:text-white transition-colors cursor-pointer"
            title="यदि आपका नाम सूची में नहीं दिख रहा है तो यहाँ से जोड़ें"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>विवरण जोड़ें (+Add Entry)</span>
          </button>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-800 to-slate-900 flex items-center justify-center text-white shadow-sm shrink-0 border border-emerald-700/40">
              <ArrowLeftRight className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                  <span>बिहार स्टॉफ नर्स म्यूचुअल ट्रांसफर पोर्टल</span>
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded-sm">
                  BTSC 2026
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                गृह जिला आधारित 1-टू-1 पारस्परिक मैच, 3-तरफा ट्रांसफर लूप एवं आधिकारिक NOC आवेदन पत्र जनरेटर
              </p>
            </div>
          </div>

          {/* Search & Profile Area */}
          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
            {/* Quick candidate lookup */}
            <div className="relative flex-1 sm:w-72">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="App No या नाम से खोजें..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchDropdown(true);
                  }}
                  onFocus={() => setShowSearchDropdown(true)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                />
              </div>

              {/* Quick Results Dropdown */}
              {showSearchDropdown && searchResults.length > 0 && (
                <div 
                  className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto"
                  onMouseLeave={() => setShowSearchDropdown(false)}
                >
                  <div className="p-2 border-b border-slate-100 text-[10px] uppercase font-semibold text-slate-400">
                    त्वरित मैच खोज (Quick Match)
                  </div>
                  {searchResults.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onSelectCandidateForMatch(c);
                        setShowSearchDropdown(false);
                        setSearchQuery('');
                      }}
                      className="w-full text-left p-2.5 hover:bg-emerald-50/70 border-b border-slate-100 last:border-0 transition-colors flex items-center justify-between gap-2"
                    >
                      <div>
                        <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                          <span>{c.name}</span>
                          <span className="text-[11px] font-mono text-slate-500 font-normal">
                            ({c.applicationNo})
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          गृह जिला: <strong className="text-slate-700">{c.homeDistrict}</strong> ➔ पदस्थापित: <span className="text-slate-700">{c.postingDistrict}</span>
                        </div>
                      </div>
                      <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-1 rounded shrink-0">
                        मैच देखें ➔
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Action */}
            {currentUser ? (
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-600 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 transition-colors text-xs font-medium cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="font-semibold leading-tight truncate max-w-[110px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-emerald-700 leading-tight">
                    {currentUser.homeDistrict}
                  </div>
                </div>
              </button>
            ) : (
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>मेरी प्रोफ़ाइल (Claim Profile)</span>
              </button>
            )}
          </div>
        </div>

        {/* Live System Stats Strip */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap text-slate-600">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-700" />
              <span>कुल अभ्यर्थी: <strong className="text-slate-900 font-bold">{totalCandidates}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <ArrowLeftRight className="w-3.5 h-3.5 text-blue-600" />
              <span>उपलब्ध 1:1 म्यूचुअल पेयर्स: <strong className="text-slate-900 font-bold">{directMatchesCount}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitFork className="w-3.5 h-3.5 text-purple-600" />
              <span>3-तरफा ट्रांसफर लूप्स: <strong className="text-slate-900 font-bold">{threeWayChainsCount}</strong></span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>अधिसूचना क्रमांक 880(6B) आधारित सत्यापित डेटा</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 mt-3 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('matcher')}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'matcher'
                ? 'bg-emerald-800 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>म्यूचुअल मैच ढूंढें (Match Finder)</span>
          </button>

          <button
            onClick={() => setActiveTab('directory')}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'directory'
                ? 'bg-emerald-800 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>सभी अभ्यर्थी सूची (Candidate Directory)</span>
          </button>

          <button
            onClick={() => setActiveTab('chains')}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'chains'
                ? 'bg-emerald-800 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>3-तरफा ट्रांसफर चक्र (3-Way Chains)</span>
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-emerald-800 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>जिलावार मांग-आपूर्ति (District Demand Matrix)</span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer relative ${
              activeTab === 'requests'
                ? 'bg-emerald-800 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <SendHorizontal className="w-3.5 h-3.5" />
            <span>स्वैप अनुरोध (Swap Requests)</span>
            {swapRequestsCount > 0 && (
              <span className="w-5 h-5 bg-amber-500 text-slate-900 rounded-full text-[10px] font-bold flex items-center justify-center">
                {swapRequestsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

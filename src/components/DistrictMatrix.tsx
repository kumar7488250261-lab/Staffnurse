import React, { useState, useMemo } from 'react';
import { Candidate } from '../types';
import { calculateDistrictStats, DistrictStat } from '../utils/matchingEngine';
import { BIHAR_DISTRICTS, BIHAR_DIVISIONS } from '../data/biharDistricts';
import { 
  MapPin, 
  ArrowLeftRight, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Building2, 
  Users, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

interface DistrictMatrixProps {
  candidates: Candidate[];
  onSelectCandidateForMatch: (candidate: Candidate) => void;
}

export const DistrictMatrix: React.FC<DistrictMatrixProps> = ({
  candidates,
  onSelectCandidateForMatch,
}) => {
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [searchDistrict, setSearchDistrict] = useState<string>('');
  const [activeDistrictDetail, setActiveDistrictDetail] = useState<string | null>('Patna');

  const districtStats = useMemo(() => {
    return calculateDistrictStats(candidates);
  }, [candidates]);

  const filteredStats = useMemo(() => {
    return districtStats.filter((st) => {
      const distInfo = BIHAR_DISTRICTS[st.district];
      const matchesDivision =
        selectedDivision === 'all' || (distInfo && distInfo.division === selectedDivision);
      const matchesSearch =
        !searchDistrict.trim() ||
        st.district.toLowerCase().includes(searchDistrict.toLowerCase()) ||
        (distInfo && distInfo.nameHindi.includes(searchDistrict));
      return matchesDivision && matchesSearch;
    });
  }, [districtStats, selectedDivision, searchDistrict]);

  // Drilldown lists for activeDistrictDetail
  const nursesWantingToCome = useMemo(() => {
    if (!activeDistrictDetail) return [];
    return candidates.filter(
      (c) => c.homeDistrict === activeDistrictDetail && c.postingDistrict !== activeDistrictDetail
    );
  }, [candidates, activeDistrictDetail]);

  const nursesPostedHereWantingToLeave = useMemo(() => {
    if (!activeDistrictDetail) return [];
    return candidates.filter(
      (c) => c.postingDistrict === activeDistrictDetail && c.homeDistrict !== activeDistrictDetail
    );
  }, [candidates, activeDistrictDetail]);

  return (
    <div className="space-y-5">
      {/* Introduction Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>जिलावार मांग-आपूर्ति विश्लेषण (District Supply & Demand Matrix)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              देखें कि किस जिले में कितने मूल निवासी वापस आना चाहते हैं और वर्तमान में वहाँ कितने नर्स पदस्थापित हैं।
            </p>
          </div>
        </div>

        {/* Filter controls */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="जिला खोजें (उदा० Patna, Darbhanga, Rohtas)..."
              value={searchDistrict}
              onChange={(e) => setSearchDistrict(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">प्रमंडल (Division):</span>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              <option value="all">सभी 9 प्रमंडल (All Divisions)</option>
              {BIHAR_DIVISIONS.map((div) => (
                <option key={div} value={div}>
                  {div} प्रमंडल
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Left side table/cards, Right side drilldown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* District List (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-3 bg-slate-100/70 border-b border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-between">
            <span>बिहार के जिले ({filteredStats.length})</span>
            <span className="text-[11px] text-slate-500 font-normal">क्लिक करके विवरण देखें</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {filteredStats.map((st) => {
              const isSelected = activeDistrictDetail === st.district;
              const distInfo = BIHAR_DISTRICTS[st.district];

              return (
                <div
                  key={st.district}
                  onClick={() => setActiveDistrictDetail(st.district)}
                  className={`p-3.5 transition-all cursor-pointer flex items-center justify-between gap-3 text-xs ${
                    isSelected ? 'bg-emerald-50/80 border-l-4 border-emerald-700' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-xs shrink-0">
                      {st.district.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{st.district}</span>
                        {distInfo && (
                          <span className="text-slate-500 text-[11px] font-normal">
                            ({distInfo.nameHindi})
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        प्रमंडल: {distInfo?.division || 'राज्य से बाहर'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="font-bold text-slate-800">{st.wantToCome} वापस आना चाहते हैं</div>
                      <div className="text-[11px] text-slate-500">{st.postedCount} वर्तमान पदस्थापित</div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isSelected ? 'translate-x-1 text-emerald-700' : ''}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Drilldown Details (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {activeDistrictDetail ? (
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-700" />
                    <span>{activeDistrictDetail}</span>
                    {BIHAR_DISTRICTS[activeDistrictDetail] && (
                      <span className="text-slate-500 font-normal text-xs">
                        ({BIHAR_DISTRICTS[activeDistrictDetail].nameHindi})
                      </span>
                    )}
                  </h3>
                  <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {BIHAR_DISTRICTS[activeDistrictDetail]?.division || 'प्रमंडल'} प्रमंडल
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  इस जिले के लिए पारस्परिक स्थानांतरण के दो मुख्य समूह:
                </p>
              </div>

              {/* Group 1: Native Nurses Posted Elsewhere */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-900 mb-2">
                  <span>1. गृह जिला {activeDistrictDetail} है, पर बाहर पदस्थापित हैं ({nursesWantingToCome.length})</span>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {nursesWantingToCome.length === 0 ? (
                    <p className="text-[11px] text-slate-400 italic p-2 bg-slate-50 rounded">
                      कोई अन्य जिले में पदस्थापित नहीं मिला।
                    </p>
                  ) : (
                    nursesWantingToCome.map((c) => (
                      <div
                        key={c.id}
                        className="p-2.5 bg-emerald-50/40 rounded-lg border border-emerald-100 text-xs flex items-center justify-between gap-2"
                      >
                        <div>
                          <div className="font-bold text-slate-900">{c.name}</div>
                          <div className="text-[10px] text-slate-500">
                            वर्तमान पदस्थापन: <strong className="text-slate-700">{c.postingDistrict}</strong> ({c.postingPlace})
                          </div>
                        </div>
                        <button
                          onClick={() => onSelectCandidateForMatch(c)}
                          className="px-2 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[10px] font-semibold shrink-0 cursor-pointer"
                        >
                          मैच खोलें
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Group 2: Outside Nurses Posted in this District */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-blue-900 mb-2">
                  <span>2. वर्तमान में {activeDistrictDetail} में पदस्थापित हैं, गृह जिला अन्यत्र है ({nursesPostedHereWantingToLeave.length})</span>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {nursesPostedHereWantingToLeave.length === 0 ? (
                    <p className="text-[11px] text-slate-400 italic p-2 bg-slate-50 rounded">
                      कोई बाहरी निवासी पदस्थापित नहीं मिला।
                    </p>
                  ) : (
                    nursesPostedHereWantingToLeave.map((c) => (
                      <div
                        key={c.id}
                        className="p-2.5 bg-blue-50/40 rounded-lg border border-blue-100 text-xs flex items-center justify-between gap-2"
                      >
                        <div>
                          <div className="font-bold text-slate-900">{c.name}</div>
                          <div className="text-[10px] text-slate-500">
                            गृह जिला: <strong className="text-slate-700">{c.homeDistrict}</strong> · अस्पताल: {c.postingPlace}
                          </div>
                        </div>
                        <button
                          onClick={() => onSelectCandidateForMatch(c)}
                          className="px-2 py-1 bg-blue-700 hover:bg-blue-800 text-white rounded text-[10px] font-semibold shrink-0 cursor-pointer"
                        >
                          मैच खोलें
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 text-xs">
              बाईं ओर किसी जिले पर क्लिक करके उसका विस्तृत विवरण देखें।
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

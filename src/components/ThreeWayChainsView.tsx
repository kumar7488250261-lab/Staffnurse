import React, { useState, useMemo } from 'react';
import { Candidate, ThreeWayMatch } from '../types';
import { findAllThreeWayChains } from '../utils/matchingEngine';
import { BIHAR_DISTRICTS } from '../data/biharDistricts';
import { 
  GitFork, 
  ArrowRight, 
  SendHorizontal, 
  MessageCircle, 
  Search, 
  Filter, 
  CheckCircle2, 
  FileText,
  Building2,
  MapPin,
  Sparkles
} from 'lucide-react';

interface ThreeWayChainsViewProps {
  candidates: Candidate[];
  onSelectCandidateForMatch: (candidate: Candidate) => void;
  onSendSwapRequest: (targetCandidate: Candidate, note?: string) => void;
  currentUser: Candidate | null;
}

export const ThreeWayChainsView: React.FC<ThreeWayChainsViewProps> = ({
  candidates,
  onSelectCandidateForMatch,
  onSendSwapRequest,
  currentUser,
}) => {
  const [districtFilter, setDistrictFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const allChains = useMemo(() => {
    return findAllThreeWayChains(candidates);
  }, [candidates]);

  const filteredChains = useMemo(() => {
    return allChains.filter((chain) => {
      const q = searchTerm.toLowerCase();
      const textMatch =
        !searchTerm.trim() ||
        chain.candidateA.name.toLowerCase().includes(q) ||
        chain.candidateB.name.toLowerCase().includes(q) ||
        chain.candidateC.name.toLowerCase().includes(q) ||
        chain.candidateA.applicationNo.toLowerCase().includes(q) ||
        chain.candidateB.applicationNo.toLowerCase().includes(q) ||
        chain.candidateC.applicationNo.toLowerCase().includes(q);

      const districtMatch =
        districtFilter === 'all' ||
        chain.candidateA.homeDistrict === districtFilter ||
        chain.candidateB.homeDistrict === districtFilter ||
        chain.candidateC.homeDistrict === districtFilter ||
        chain.candidateA.postingDistrict === districtFilter ||
        chain.candidateB.postingDistrict === districtFilter ||
        chain.candidateC.postingDistrict === districtFilter;

      return textMatch && districtMatch;
    });
  }, [allChains, searchTerm, districtFilter]);

  const getWhatsAppLoopLink = (chain: ThreeWayMatch) => {
    const msg = encodeURIComponent(
      `नमस्ते साथी नर्स!\n\nहमारा 3-तरफा म्यूचुअल ट्रांसफर लूप (3-Way Circular Mutual Transfer) बन गया है:\n1. ${chain.candidateA.name} (${chain.candidateA.postingDistrict} ➔ ${chain.candidateA.homeDistrict})\n2. ${chain.candidateB.name} (${chain.candidateB.postingDistrict} ➔ ${chain.candidateB.homeDistrict})\n3. ${chain.candidateC.name} (${chain.candidateC.postingDistrict} ➔ ${chain.candidateC.homeDistrict})\n\nइस त्रिकोणीय ट्रांसफर से हम तीनों को अपना गृह जिला मिल जाएगा। कृपया संपर्क करें ताकि स्वास्थ्य विभाग, बिहार में संयुक्त आवेदन पत्र प्रस्तुत किया जा सके!`
    );
    const phone = chain.candidateB.phone || '919876543210';
    return `https://wa.me/${phone.replace(/\D/g, '')}?text=${msg}`;
  };

  return (
    <div className="space-y-4">
      {/* Overview Card */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white rounded-xl p-5 shadow-xs border border-purple-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-purple-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>स्मार्ट त्रिकोणीय ट्रांसफर तकनीक (3-Way Triangular Matching)</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold mt-1 text-white">
              जब सीधा 1:1 ट्रांसफर न मिले, तब 3-तरफा लूप ट्रांसफर सबसे कारगर उपाय है!
            </h2>
            <p className="text-xs text-purple-200 mt-1 max-w-2xl">
              यदि नर्स A को B का पदस्थापन, B को C का पदस्थापन और C को A का पदस्थापन चाहिए — तो तीनों एक साथ पारस्परिक अनापत्ति (Joint Mutual NOC) देकर अपने गृह जिले पहुँच सकते हैं।
            </p>
          </div>
          <div className="bg-purple-800/60 border border-purple-700/60 rounded-xl p-3 text-center shrink-0">
            <div className="text-2xl font-black text-purple-200">{allChains.length}</div>
            <div className="text-[11px] text-purple-300 font-medium">उपलब्ध 3-वे लूप्स</div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="लूप में नाम या आवेदन संख्या खोजें..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">जिला शामिल हो:</span>
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-purple-600"
          >
            <option value="all">सभी जिले (All Districts)</option>
            {Object.keys(BIHAR_DISTRICTS).map((d) => (
              <option key={d} value={d}>
                {d} ({BIHAR_DISTRICTS[d]?.nameHindi})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chain Results */}
      <div className="space-y-4">
        {filteredChains.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
            <GitFork className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">कोई 3-तरफा लूप नहीं मिला</h3>
            <p className="text-xs text-slate-500 mt-1">
              चयनित फ़िल्टर के अनुसार कोई चक्र उपलब्ध नहीं है। कृपया फ़िल्टर बदलें।
            </p>
          </div>
        ) : (
          filteredChains.map((chain, idx) => (
            <div
              key={chain.id || idx}
              className="bg-white rounded-xl border border-purple-200/90 p-4 shadow-xs hover:border-purple-400 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-900 font-bold text-xs flex items-center justify-center font-mono">
                    #{idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-900">
                    ट्रायंगल ट्रांसफर रूट (Triangular Swap Loop)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={getWhatsAppLoopLink(chain)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-md text-[11px] font-semibold flex items-center gap-1"
                  >
                    <MessageCircle className="w-3 h-3 text-emerald-600" />
                    <span>तीनों को WhatsApp संदेश भेजें</span>
                  </a>
                </div>
              </div>

              {/* Visual 3-Node Workflow */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Step 1 */}
                <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-100 relative">
                  <div className="flex items-center justify-between text-[10px] font-bold text-purple-900 uppercase tracking-wider mb-1">
                    <span>नर्स 1</span>
                    <span className="font-mono">{chain.candidateA.applicationNo}</span>
                  </div>
                  <div className="font-bold text-slate-900 text-xs">{chain.candidateA.name}</div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    वर्तमान: <strong className="text-slate-800">{chain.candidateA.postingDistrict}</strong>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                    गृह जिला ➔ {chain.candidateA.homeDistrict}
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400 truncate" title={chain.candidateA.postingPlace}>
                    {chain.candidateA.postingPlace}
                  </div>
                  <button
                    onClick={() => onSelectCandidateForMatch(chain.candidateA)}
                    className="mt-2 text-[10px] text-purple-700 hover:text-purple-900 font-semibold cursor-pointer"
                  >
                    प्रोफ़ाइल देखें ➔
                  </button>
                </div>

                {/* Step 2 */}
                <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 relative">
                  <div className="flex items-center justify-between text-[10px] font-bold text-blue-900 uppercase tracking-wider mb-1">
                    <span>नर्स 2</span>
                    <span className="font-mono">{chain.candidateB.applicationNo}</span>
                  </div>
                  <div className="font-bold text-slate-900 text-xs">{chain.candidateB.name}</div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    वर्तमान: <strong className="text-slate-800">{chain.candidateB.postingDistrict}</strong>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                    गृह जिला ➔ {chain.candidateB.homeDistrict}
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400 truncate" title={chain.candidateB.postingPlace}>
                    {chain.candidateB.postingPlace}
                  </div>
                  <button
                    onClick={() => onSelectCandidateForMatch(chain.candidateB)}
                    className="mt-2 text-[10px] text-blue-700 hover:text-blue-900 font-semibold cursor-pointer"
                  >
                    प्रोफ़ाइल देखें ➔
                  </button>
                </div>

                {/* Step 3 */}
                <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-100 relative">
                  <div className="flex items-center justify-between text-[10px] font-bold text-amber-900 uppercase tracking-wider mb-1">
                    <span>नर्स 3</span>
                    <span className="font-mono">{chain.candidateC.applicationNo}</span>
                  </div>
                  <div className="font-bold text-slate-900 text-xs">{chain.candidateC.name}</div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    वर्तमान: <strong className="text-slate-800">{chain.candidateC.postingDistrict}</strong>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                    गृह जिला ➔ {chain.candidateC.homeDistrict}
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400 truncate" title={chain.candidateC.postingPlace}>
                    {chain.candidateC.postingPlace}
                  </div>
                  <button
                    onClick={() => onSelectCandidateForMatch(chain.candidateC)}
                    className="mt-2 text-[10px] text-amber-700 hover:text-amber-900 font-semibold cursor-pointer"
                  >
                    प्रोफ़ाइल देखें ➔
                  </button>
                </div>
              </div>

              {/* Loop Explanation Bar */}
              <div className="mt-3 p-2 bg-slate-50 rounded-lg text-[11px] text-slate-600 flex items-center gap-2 border border-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  <strong>ट्रांसफर प्रवाह (Circular Flow):</strong> {chain.chainText}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

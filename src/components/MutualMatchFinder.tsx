import React, { useState, useMemo } from 'react';
import { Candidate, MutualMatch, ThreeWayMatch } from '../types';
import { 
  findMatchesForCandidate, 
  findThreeWayMatchesForCandidate,
  findAllMutualPairs 
} from '../utils/matchingEngine';
import { BIHAR_DISTRICTS } from '../data/biharDistricts';
import { 
  ArrowLeftRight, 
  MapPin, 
  Building2, 
  Phone, 
  MessageCircle, 
  FileText, 
  SendHorizontal, 
  Sparkles, 
  Search, 
  Filter, 
  CheckCircle2, 
  GitFork,
  ArrowRight,
  UserCheck,
  AlertCircle
} from 'lucide-react';

interface MutualMatchFinderProps {
  candidates: Candidate[];
  selectedCandidate: Candidate | null;
  onSelectCandidate: (candidate: Candidate | null) => void;
  onSendSwapRequest: (targetCandidate: Candidate, note?: string) => void;
  onGenerateNOC: (candidateA: Candidate, candidateB: Candidate) => void;
  currentUser: Candidate | null;
}

export const MutualMatchFinder: React.FC<MutualMatchFinderProps> = ({
  candidates,
  selectedCandidate,
  onSelectCandidate,
  onSendSwapRequest,
  onGenerateNOC,
  currentUser,
}) => {
  const [matchFilterType, setMatchFilterType] = useState<'all' | 'direct' | 'adjacent' | 'chains'>('all');
  const [districtFilter, setDistrictFilter] = useState<string>('all');
  const [candidateSearchQuery, setCandidateSearchQuery] = useState<string>('');
  const [requestTarget, setRequestTarget] = useState<Candidate | null>(null);
  const [requestNote, setRequestNote] = useState<string>('');
  const [requestSentNotice, setRequestSentNotice] = useState<string | null>(null);

  // If currentUser exists and no selectedCandidate, default to currentUser
  const activeCandidate = selectedCandidate || currentUser;

  // 1:1 matches for active candidate
  const candidateMatches = useMemo(() => {
    if (!activeCandidate) return [];
    return findMatchesForCandidate(activeCandidate, candidates);
  }, [activeCandidate, candidates]);

  // 3-way matches for active candidate
  const candidateThreeWayMatches = useMemo(() => {
    if (!activeCandidate) return [];
    return findThreeWayMatchesForCandidate(activeCandidate, candidates);
  }, [activeCandidate, candidates]);

  // All system-wide mutual pairs (when no specific candidate is selected)
  const allMutualPairs = useMemo(() => {
    return findAllMutualPairs(candidates);
  }, [candidates]);

  // Filtered matches for active candidate
  const filteredMatches = useMemo(() => {
    let list = candidateMatches;
    if (matchFilterType === 'direct') {
      list = list.filter((m) => m.matchType === 'direct');
    } else if (matchFilterType === 'adjacent') {
      list = list.filter((m) => m.matchType === 'adjacent' || m.matchType === 'preferred');
    }
    if (districtFilter !== 'all') {
      list = list.filter((m) => m.candidateB.postingDistrict === districtFilter || m.candidateB.homeDistrict === districtFilter);
    }
    return list;
  }, [candidateMatches, matchFilterType, districtFilter]);

  // Quick candidate switcher list
  const filteredCandidateOptions = useMemo(() => {
    if (!candidateSearchQuery.trim()) return candidates.slice(0, 15);
    const q = candidateSearchQuery.toLowerCase();
    return candidates.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.applicationNo.toLowerCase().includes(q) ||
        c.homeDistrict.toLowerCase().includes(q) ||
        c.postingDistrict.toLowerCase().includes(q)
    ).slice(0, 20);
  }, [candidateSearchQuery, candidates]);

  const handleSendRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestTarget) return;
    onSendSwapRequest(requestTarget, requestNote);
    setRequestSentNotice(`अनुरोध सफलतापूर्वक भेज दिया गया! (${requestTarget.name} - ${requestTarget.applicationNo})`);
    setRequestTarget(null);
    setRequestNote('');
    setTimeout(() => setRequestSentNotice(null), 5000);
  };

  const getWhatsAppLink = (c: Candidate, partner?: Candidate) => {
    const fromName = activeCandidate?.name || 'Candidate';
    const fromApp = activeCandidate?.applicationNo || '';
    const fromHome = activeCandidate?.homeDistrict || '';
    const fromPost = activeCandidate?.postingPlace || '';

    const msg = encodeURIComponent(
      `नमस्ते ${c.name} जी,\n\nमैं ${fromName} (Advt 23/2025 BTSC Staff Nurse, App No: ${fromApp}) बोल रहा/रही हूँ।\n\nमेरा गृह जिला: ${fromHome}\nवर्तमान पदस्थापन: ${fromPost}\n\nआपका वर्तमान पदस्थापन: ${c.postingPlace} (${c.postingDistrict})\nआपका गृह जिला: ${c.homeDistrict}\n\nपोर्टल पर हमारा म्यूचुअल ट्रांसफर मैच (Mutual Swap Match) बना है। क्या आप पारस्परिक स्थानांतरण हेतु संयुक्त आवेदन (Mutual Transfer NOC) प्रस्तुत करने के लिए इच्छुक हैं?\nकृपया संपर्क करें। धन्यवाद!`
    );

    const phoneNum = c.phone || '919876543210';
    return `https://wa.me/${phoneNum.replace(/\D/g, '')}?text=${msg}`;
  };

  return (
    <div className="space-y-6">
      {/* Alert banner if request was sent */}
      {requestSentNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl flex items-center justify-between gap-3 text-sm shadow-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{requestSentNotice}</span>
          </div>
          <button 
            onClick={() => setRequestSentNotice(null)}
            className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold"
          >
            ✕ बंद करें
          </button>
        </div>
      )}

      {/* Target Candidate Picker Box */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>अभ्यर्थी चयन (Selected Candidate for Mutual Transfer)</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              {activeCandidate ? (
                <span>
                  {activeCandidate.name} <span className="font-mono text-xs font-normal text-slate-500">({activeCandidate.applicationNo})</span>
                </span>
              ) : (
                <span>अपना विवरण चुनें और तत्काल मैच देखें</span>
              )}
            </h2>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {activeCandidate && (
              <button
                onClick={() => onSelectCandidate(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                चयन हटाएं (Clear Selection)
              </button>
            )}

            <div className="relative">
              <input
                type="text"
                placeholder="सूची में से चुनें या सर्च करें..."
                value={candidateSearchQuery}
                onChange={(e) => setCandidateSearchQuery(e.target.value)}
                className="w-64 px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Selected Candidate Snapshot or Quick Picker */}
        {activeCandidate ? (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100/80">
            <div>
              <div className="text-[11px] font-medium text-slate-500">पिता का नाम (Father's Name)</div>
              <div className="text-xs font-semibold text-slate-900 mt-0.5">{activeCandidate.fatherName}</div>
              <div className="text-[11px] text-slate-500 mt-1">कोटि: <span className="font-semibold text-slate-800">{activeCandidate.category}</span> · मेधा: #{activeCandidate.meritNo}</div>
            </div>

            <div>
              <div className="text-[11px] font-medium text-slate-500">गृह जिला (Home District)</div>
              <div className="text-xs font-bold text-emerald-800 mt-0.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{activeCandidate.homeDistrict}</span>
              </div>
              <div className="text-[11px] text-emerald-700/80 mt-1">
                {BIHAR_DISTRICTS[activeCandidate.homeDistrict]?.nameHindi || 'मूल निवास'}
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="text-[11px] font-medium text-slate-500">वर्तमान पदस्थापन स्थल (Current Posting Place)</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{activeCandidate.postingPlace}</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                पदस्थापन जिला: <strong className="text-slate-800">{activeCandidate.postingDistrict}</strong>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-xs text-slate-500 mb-2">
              नीचे दी गई सूची में से किसी भी नर्स पर क्लिक करें या ऊपर सर्च बार में अपना नाम/रोल नंबर खोजें:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
              {filteredCandidateOptions.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onSelectCandidate(c)}
                  className="text-left p-2.5 rounded-lg border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/40 transition-all text-xs cursor-pointer flex items-center justify-between gap-2"
                >
                  <div className="truncate">
                    <div className="font-semibold text-slate-900 truncate">{c.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">
                      गृह: <span className="font-medium text-slate-700">{c.homeDistrict}</span> ➔ पदस्थापित: <span className="font-medium text-slate-700">{c.postingDistrict}</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-slate-100 group-hover:bg-emerald-100 text-slate-700 px-2 py-0.5 rounded font-mono shrink-0">
                    {c.applicationNo}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* When Active Candidate is set: Match Results Section */}
      {activeCandidate ? (
        <div className="space-y-4">
          {/* Match Sub-Tabs & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setMatchFilterType('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  matchFilterType === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                सभी मैच ({candidateMatches.length})
              </button>
              <button
                onClick={() => setMatchFilterType('direct')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  matchFilterType === 'direct'
                    ? 'bg-emerald-800 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                सटीक 1:1 मैच ({candidateMatches.filter((m) => m.matchType === 'direct').length})
              </button>
              <button
                onClick={() => setMatchFilterType('adjacent')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  matchFilterType === 'adjacent'
                    ? 'bg-blue-800 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                पड़ोसी/प्रमंडल मैच ({candidateMatches.filter((m) => m.matchType === 'adjacent' || m.matchType === 'preferred').length})
              </button>
              <button
                onClick={() => setMatchFilterType('chains')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  matchFilterType === 'chains'
                    ? 'bg-purple-800 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                3-तरफा लूप्स ({candidateThreeWayMatches.length})
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">जिला फ़िल्टर:</span>
              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="px-2.5 py-1 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600"
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

          {/* Results Display */}
          {matchFilterType === 'chains' ? (
            /* 3-Way Chains for Active Candidate */
            <div className="space-y-3">
              {candidateThreeWayMatches.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                  <GitFork className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <h3 className="text-sm font-bold text-slate-800">कोई 3-तरफा लूप उपलब्ध नहीं</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    इस अभ्यर्थी के लिए कोई 3-तरफा त्रिकोणीय स्थानांतरण श्रृंखला नहीं मिली। कृपया 1:1 प्रत्यक्ष मैच देखें।
                  </p>
                </div>
              ) : (
                candidateThreeWayMatches.map((chain, idx) => (
                  <div key={chain.id || idx} className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-purple-300 transition-all">
                    <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-purple-900">
                          त्रिकोणीय स्थानांतरण लूप (3-Way Mutual Cycle)
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500">
                        तीनों नर्सों को उनका मनपसंद गृह जिला मिलेगा!
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* Node A */}
                      <div className="p-3 bg-purple-50/60 rounded-lg border border-purple-100">
                        <div className="text-[10px] font-bold text-purple-800 uppercase tracking-wider">नर्स A (आप)</div>
                        <div className="text-xs font-bold text-slate-900 mt-1">{chain.candidateA.name}</div>
                        <div className="text-[11px] text-slate-600 mt-1">
                          वर्तमान: <strong className="text-slate-800">{chain.candidateA.postingDistrict}</strong>
                        </div>
                        <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                          चाहिए ➔ {chain.candidateA.homeDistrict}
                        </div>
                      </div>

                      {/* Node B */}
                      <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100">
                        <div className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">नर्स B (पार्टनर 1)</div>
                        <div className="text-xs font-bold text-slate-900 mt-1">{chain.candidateB.name}</div>
                        <div className="text-[11px] text-slate-600 mt-1">
                          वर्तमान: <strong className="text-slate-800">{chain.candidateB.postingDistrict}</strong>
                        </div>
                        <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                          चाहिए ➔ {chain.candidateB.homeDistrict}
                        </div>
                        <div className="mt-2 pt-2 border-t border-blue-100/60 flex items-center gap-2">
                          <button
                            onClick={() => setRequestTarget(chain.candidateB)}
                            className="text-[10px] text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <SendHorizontal className="w-3 h-3" />
                            <span>अनुरोध भेजें</span>
                          </button>
                          <a
                            href={getWhatsAppLink(chain.candidateB)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>

                      {/* Node C */}
                      <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-100">
                        <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">नर्स C (पार्टनर 2)</div>
                        <div className="text-xs font-bold text-slate-900 mt-1">{chain.candidateC.name}</div>
                        <div className="text-[11px] text-slate-600 mt-1">
                          वर्तमान: <strong className="text-slate-800">{chain.candidateC.postingDistrict}</strong>
                        </div>
                        <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                          चाहिए ➔ {chain.candidateC.homeDistrict}
                        </div>
                        <div className="mt-2 pt-2 border-t border-amber-100/60 flex items-center gap-2">
                          <button
                            onClick={() => setRequestTarget(chain.candidateC)}
                            className="text-[10px] text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <SendHorizontal className="w-3 h-3" />
                            <span>अनुरोध भेजें</span>
                          </button>
                          <a
                            href={getWhatsAppLink(chain.candidateC)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* 1:1 Direct or Adjacent Matches */
            <div className="space-y-3">
              {filteredMatches.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                  <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <h3 className="text-sm font-bold text-slate-800">वर्तमान फ़िल्टर में कोई 1:1 मैच नहीं मिला</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    इस जिले के लिए प्रत्यक्ष 1-टू-1 मैच उपलब्ध नहीं है। कृपया 'पड़ोसी/प्रमंडल मैच' अथवा '3-तरफा लूप्स' टैब देखें, या 'सभी अभ्यर्थी सूची' में खोजें।
                  </p>
                </div>
              ) : (
                filteredMatches.map((m, idx) => {
                  const partner = m.candidateB;
                  const isDirect = m.matchType === 'direct';

                  return (
                    <div
                      key={partner.id || idx}
                      className={`bg-white rounded-xl border p-4 shadow-xs transition-all hover:shadow-sm ${
                        isDirect
                          ? 'border-emerald-300 ring-1 ring-emerald-400/30'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                              isDirect
                                ? 'bg-emerald-700 text-white'
                                : 'bg-blue-600 text-white'
                            }`}
                          >
                            {m.matchScore}%
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm font-bold text-slate-900">{partner.name}</h3>
                              <span className="font-mono text-xs text-slate-500 font-medium">
                                ({partner.applicationNo})
                              </span>
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm ${
                                  isDirect
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-blue-50 text-blue-800'
                                }`}
                              >
                                {isDirect ? '100% सटीक डायरेक्ट मैच' : 'पड़ोसी जिला / क्लस्टर मैच'}
                              </span>
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5">
                              पिता: {partner.fatherName} · कोटि: <strong className="text-slate-700">{partner.category}</strong> · मेधा क्रमांक: #{partner.meritNo}
                            </div>
                          </div>
                        </div>

                        {/* Transfer Direction Summary */}
                        <div className="bg-slate-50 rounded-lg p-2.5 text-xs text-slate-700 border border-slate-100 shrink-0">
                          <div className="font-medium text-slate-500 text-[11px] mb-1">स्थानांतरण तुलना (Swap Route)</div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-emerald-800">{activeCandidate.postingDistrict}</span>
                            <ArrowLeftRight className="w-3.5 h-3.5 text-slate-400" />
                            <span className="font-semibold text-emerald-800">{partner.postingDistrict}</span>
                          </div>
                        </div>
                      </div>

                      {/* Detail & Action row */}
                      <div className="mt-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="text-xs text-slate-600">
                          <div className="flex items-center gap-1.5 text-slate-700">
                            <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>वर्तमान पदस्थापन: <strong>{partner.postingPlace}</strong></span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-500 mt-0.5 text-[11px]">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>गृह जिला: <strong className="text-slate-800">{partner.homeDistrict}</strong></span>
                            <span className="text-slate-300">·</span>
                            <span>{m.reason}</span>
                          </div>
                        </div>

                        {/* Interactive Action Buttons */}
                        <div className="flex items-center gap-2 flex-wrap shrink-0">
                          <button
                            onClick={() => setRequestTarget(partner)}
                            className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                          >
                            <SendHorizontal className="w-3.5 h-3.5" />
                            <span>स्वैप अनुरोध भेजें</span>
                          </button>

                          <a
                            href={getWhatsAppLink(partner)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                            title="सीधे WhatsApp पर संपर्क करें"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>WhatsApp चैट</span>
                          </a>

                          <button
                            onClick={() => onGenerateNOC(activeCandidate, partner)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                            title="पारस्परिक स्थानांतरण हेतु आधिकारिक आवेदन पत्र बनाएं"
                          >
                            <FileText className="w-3.5 h-3.5 text-slate-600" />
                            <span>NOC पत्र बनाएं</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      ) : (
        /* Global State: Showing all system available mutual pairs */
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>उपलब्ध सभी पारस्परिक स्थानांतरण जोड़ियां (All Mutual Swap Pairs in Bihar)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  विभागीय आदेश के अनुसार दोनों पक्षों के गृह जिले और वर्तमान पदस्थापन से 100% सटीक मैच
                </p>
              </div>
              <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
                कुल जोड़ियां: {allMutualPairs.length}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {allMutualPairs.slice(0, 16).map((pair, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/20 transition-all text-xs"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-2">
                    <span className="font-semibold text-emerald-800 text-[11px] bg-emerald-100/70 px-2 py-0.5 rounded">
                      {pair.candidateA.homeDistrict} ⇄ {pair.candidateB.homeDistrict}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      100% Mutual Match
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <div className="font-bold text-slate-900">{pair.candidateA.name}</div>
                      <div className="text-slate-500 text-[10px]">App: {pair.candidateA.applicationNo}</div>
                      <div className="text-slate-600 mt-1">गृह: <strong>{pair.candidateA.homeDistrict}</strong></div>
                      <div className="text-slate-600">पदस्थापित: <strong>{pair.candidateA.postingDistrict}</strong></div>
                    </div>

                    <div className="p-2 bg-slate-50 rounded-lg">
                      <div className="font-bold text-slate-900">{pair.candidateB.name}</div>
                      <div className="text-slate-500 text-[10px]">App: {pair.candidateB.applicationNo}</div>
                      <div className="text-slate-600 mt-1">गृह: <strong>{pair.candidateB.homeDistrict}</strong></div>
                      <div className="text-slate-600">पदस्थापित: <strong>{pair.candidateB.postingDistrict}</strong></div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => onSelectCandidate(pair.candidateA)}
                      className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
                    >
                      यह मैच खोलें ➔
                    </button>
                    <button
                      onClick={() => onGenerateNOC(pair.candidateA, pair.candidateB)}
                      className="text-xs text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <FileText className="w-3 h-3" />
                      <span>आवेदन प्रारूप</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Send Swap Request Modal Dialog */}
      {requestTarget && activeCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <SendHorizontal className="w-4 h-4 text-emerald-600" />
                  <span>पारस्परिक स्थानांतरण अनुरोध भेजें (Send Swap Request)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  आधिकारिक विज्ञापन 23/2025 पारस्परिक स्थानांतरण
                </p>
              </div>
              <button
                onClick={() => setRequestTarget(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendRequestSubmit} className="mt-4 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">प्रेषक (You)</span>
                    <div className="font-bold text-slate-900 text-xs mt-0.5">{activeCandidate.name}</div>
                    <div className="text-[11px] text-slate-600">गृह: {activeCandidate.homeDistrict}</div>
                    <div className="text-[11px] text-slate-600">पदस्थापित: {activeCandidate.postingDistrict}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">प्राप्तकर्ता (Target)</span>
                    <div className="font-bold text-slate-900 text-xs mt-0.5">{requestTarget.name}</div>
                    <div className="text-[11px] text-slate-600">गृह: {requestTarget.homeDistrict}</div>
                    <div className="text-[11px] text-slate-600">पदस्थापित: {requestTarget.postingDistrict}</div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  आपका संदेश / स्थिति नोट (Optional Message / Notes)
                </label>
                <textarea
                  rows={3}
                  value={requestNote}
                  onChange={(e) => setRequestNote(e.target.value)}
                  placeholder="उदा० नमस्ते, मैं तत्काल पारस्परिक स्थानांतरण के लिए तैयार हूँ। मेरे सभी दस्तावेज़ व सत्यापन पूर्ण हैं।"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-[11px] text-emerald-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  अनुरोध भेजने पर आपके पोर्टल डैशबोर्ड में यह दर्ज हो जाएगा, और आप सीधे WhatsApp पर भी उनसे जुड़ सकते हैं।
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setRequestTarget(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium cursor-pointer"
                >
                  रद्द करें (Cancel)
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <SendHorizontal className="w-3.5 h-3.5" />
                  <span>अनुरोध प्रेषित करें</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

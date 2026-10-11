/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Candidate, SwapRequest, MutualMatch } from './types';
import { INITIAL_CANDIDATES } from './data/candidates';
import { findAllMutualPairs, findAllThreeWayChains } from './utils/matchingEngine';
import { Header } from './components/Header';
import { MutualMatchFinder } from './components/MutualMatchFinder';
import { CandidateDirectory } from './components/CandidateDirectory';
import { ThreeWayChainsView } from './components/ThreeWayChainsView';
import { DistrictMatrix } from './components/DistrictMatrix';
import { SwapRequestsManager } from './components/SwapRequestsManager';
import { NOCApplicationModal } from './components/NOCApplicationModal';
import { MyProfileModal } from './components/MyProfileModal';
import { AddCandidateModal } from './components/AddCandidateModal';
import { 
  Building2, 
  FileCheck, 
  HelpCircle, 
  Info, 
  ShieldAlert, 
  Award,
  ExternalLink,
  BookOpen
} from 'lucide-react';

const CANDIDATES_STORAGE_KEY = 'btsc_mutual_candidates_v1';
const CURRENT_USER_KEY = 'btsc_current_user_v1';
const REQUESTS_STORAGE_KEY = 'btsc_swap_requests_v1';

export default function App() {
  // 1. Candidate List State
  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    try {
      const saved = localStorage.getItem(CANDIDATES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge with initial to ensure latest records are present
          const existingIds = new Set(parsed.map((c: Candidate) => c.id));
          const additions = INITIAL_CANDIDATES.filter((c) => !existingIds.has(c.id));
          return [...parsed, ...additions];
        }
      }
    } catch (e) {
      console.error('Failed to load candidates from storage', e);
    }
    return INITIAL_CANDIDATES;
  });

  // 2. Current User State
  const [currentUser, setCurrentUser] = useState<Candidate | null>(() => {
    try {
      const saved = localStorage.getItem(CURRENT_USER_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load current user', e);
    }
    // Default to candidate #1 for instant delightful preview
    return INITIAL_CANDIDATES[0] || null;
  });

  // 3. Swap Requests State
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>(() => {
    try {
      const saved = localStorage.getItem(REQUESTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load swap requests', e);
    }
    // Sample initial swap request to showcase the workflow immediately
    return [
      {
        id: 'REQ-DEMO-101',
        fromCandidateId: 'BRS000731',
        toCandidateId: 'BRS043638',
        fromCandidateName: 'ANJALI A SINGH',
        fromApplicationNo: 'BRS000731',
        fromHomeDistrict: 'Muzaffarpur',
        fromPostingPlace: 'SKMCH, Muzaffarpur',
        fromPhone: '9876543210',
        fromWhatsapp: '9876543210',
        toCandidateName: 'PUJA MAURYA',
        toApplicationNo: 'BRS043638',
        toHomeDistrict: 'Mirzapur',
        toPostingPlace: 'SKMCH, Muzaffarpur',
        toPhone: '9876543211',
        status: 'pending',
        message: 'नमस्ते! मैं मुजफ्फरपुर से पारस्परिक स्थानांतरण के लिए इच्छुक हूँ। यदि आप सहमत हों तो संयुक्त आवेदन प्रस्तुत करें।',
        createdAt: new Date().toISOString(),
      },
    ];
  });

  // 4. UI Navigation State
  const [activeTab, setActiveTab] = useState<'matcher' | 'directory' | 'chains' | 'matrix' | 'requests'>('matcher');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(currentUser);
  const [nocModalData, setNocModalData] = useState<{ candidateA: Candidate; candidateB: Candidate } | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CANDIDATES_STORAGE_KEY, JSON.stringify(candidates));
    } catch (e) {
      console.error(e);
    }
  }, [candidates]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(swapRequests));
    } catch (e) {
      console.error(e);
    }
  }, [swapRequests]);

  // Compute live match metrics
  const directMatchesCount = useMemo(() => {
    return findAllMutualPairs(candidates).length;
  }, [candidates]);

  const threeWayChainsCount = useMemo(() => {
    return findAllThreeWayChains(candidates).length;
  }, [candidates]);

  // Handlers
  const handleSelectCandidateForMatch = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setActiveTab('matcher');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendSwapRequest = (targetCandidate: Candidate, note?: string) => {
    const sender = selectedCandidate || currentUser || candidates[0];
    const newReq: SwapRequest = {
      id: `REQ-${Date.now()}`,
      fromCandidateId: sender.id,
      toCandidateId: targetCandidate.id,
      fromCandidateName: sender.name,
      fromApplicationNo: sender.applicationNo,
      fromHomeDistrict: sender.homeDistrict,
      fromPostingPlace: sender.postingPlace,
      fromPhone: sender.phone || '9876543210',
      fromWhatsapp: sender.whatsapp || sender.phone || '9876543210',
      toCandidateName: targetCandidate.name,
      toApplicationNo: targetCandidate.applicationNo,
      toHomeDistrict: targetCandidate.homeDistrict,
      toPostingPlace: targetCandidate.postingPlace,
      toPhone: targetCandidate.phone || '9876543211',
      status: 'pending',
      message: note || 'नमस्ते! क्या आप मेरे साथ पारस्परिक स्थानांतरण (Mutual Swap) के लिए सहमत हैं?',
      createdAt: new Date().toISOString(),
    };

    setSwapRequests((prev) => [newReq, ...prev]);
  };

  const handleUpdateRequestStatus = (requestId: string, status: 'accepted' | 'declined') => {
    setSwapRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status } : r))
    );
  };

  const handleDeleteRequest = (requestId: string) => {
    setSwapRequests((prev) => prev.filter((r) => r.id !== requestId));
  };

  const handleGenerateNOC = (cA: Candidate, cB: Candidate) => {
    setNocModalData({ candidateA: cA, candidateB: cB });
  };

  const handleGenerateNOCForRequest = (req: SwapRequest) => {
    const cA = candidates.find((c) => c.applicationNo === req.fromApplicationNo);
    const cB = candidates.find((c) => c.applicationNo === req.toApplicationNo);
    if (cA && cB) {
      setNocModalData({ candidateA: cA, candidateB: cB });
    }
  };

  const handleAddCandidate = (newCandidate: Candidate) => {
    setCandidates((prev) => [newCandidate, ...prev]);
    setSelectedCandidate(newCandidate);
    setCurrentUser(newCandidate);
    setActiveTab('matcher');
  };

  const handleSaveProfile = (updated: Candidate) => {
    setCurrentUser(updated);
    setSelectedCandidate(updated);
    setCandidates((prev) =>
      prev.map((c) => (c.applicationNo === updated.applicationNo ? updated : c))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Official Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        swapRequestsCount={swapRequests.filter((r) => r.status === 'pending').length}
        totalCandidates={candidates.length}
        directMatchesCount={directMatchesCount}
        threeWayChainsCount={threeWayChainsCount}
        onSelectCandidateForMatch={handleSelectCandidateForMatch}
        allCandidates={candidates}
      />

      {/* Official Health Dept Advisory / Info Strip */}
      <div className="bg-emerald-50 border-b border-emerald-200/80 text-emerald-950 py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              <strong>विभागीय निर्देश (Order Guidelines):</strong> विज्ञापन 23/2025 के अधीन नियुक्त स्टॉफ नर्स आपसी सहमति से निर्धारित प्रारूप पर अपने सिविल सर्जन/अधीक्षक के माध्यम से पारस्परिक स्थानांतरण आवेदन अग्रसारित करा सकते हैं।
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-emerald-800 font-medium shrink-0">
            <span>पे लेवल: L-7</span>
            <span>·</span>
            <span>परिवीक्षा अवधि: 1 वर्ष</span>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'matcher' && (
          <MutualMatchFinder
            candidates={candidates}
            selectedCandidate={selectedCandidate}
            onSelectCandidate={setSelectedCandidate}
            onSendSwapRequest={handleSendSwapRequest}
            onGenerateNOC={handleGenerateNOC}
            currentUser={currentUser}
          />
        )}

        {activeTab === 'directory' && (
          <CandidateDirectory
            candidates={candidates}
            onSelectCandidateForMatch={handleSelectCandidateForMatch}
            currentUser={currentUser}
          />
        )}

        {activeTab === 'chains' && (
          <ThreeWayChainsView
            candidates={candidates}
            onSelectCandidateForMatch={handleSelectCandidateForMatch}
            onSendSwapRequest={handleSendSwapRequest}
            currentUser={currentUser}
          />
        )}

        {activeTab === 'matrix' && (
          <DistrictMatrix
            candidates={candidates}
            onSelectCandidateForMatch={handleSelectCandidateForMatch}
          />
        )}

        {activeTab === 'requests' && (
          <SwapRequestsManager
            requests={swapRequests}
            onUpdateRequestStatus={handleUpdateRequestStatus}
            onDeleteRequest={handleDeleteRequest}
            onGenerateNOCForRequest={handleGenerateNOCForRequest}
            currentUser={currentUser}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 text-xs py-8 border-t border-slate-800 mt-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 font-bold text-white text-sm">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span>बिहार तकनीकी सेवा आयोग / स्वास्थ्य विभाग पोर्टल</span>
              </div>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                यह पोर्टल बिहार परिचारिका संवर्ग के नवनियुक्त स्टॉफ नर्सों को अपने गृह जिले के अनुसार पारस्परिक स्थानांतरण (Mutual Swap) खोजने एवं संपर्क करने में सहायता हेतु निर्मित है।
              </p>
            </div>

            <div>
              <div className="font-bold text-white text-sm mb-2">महत्वपूर्ण नियम व शर्तें (Clause 5 & 13)</div>
              <ul className="space-y-1.5 text-slate-400 text-[11px]">
                <li>• स्थानांतरण के उपरांत वरीयता बिहार तकनीकी सेवा आयोग के मेधा क्रमांक के अनुसार तय होगी।</li>
                <li>• पारस्परिक स्थानांतरण हेतु कोई यात्रा भत्ता (TA/DA) देय नहीं होगा।</li>
                <li>• दोनों कर्मियों को अपने संबंधित संस्थान प्रमुख से विरमन (Relieving) प्राप्त करना होगा।</li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-white text-sm mb-2">हेल्पडेस्क एवं संदर्भ</div>
              <div className="space-y-1.5 text-slate-400 text-[11px]">
                <div>आदेश सं०: 6बी/एन-01-32/2026-880(6B)</div>
                <div>वेबसाइट: <span className="text-emerald-400">state.bihar.gov.in/health</span></div>
                <div className="text-[10px] text-slate-500 mt-2">
                  सभी अधिकार संबंधित प्राधिकार के अधीन। पारस्परिक सहमति से आवेदन अग्रसारित कराएं।
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-[11px]">
            <div>© 2026 बिहार स्वास्थ्य विभाग स्टॉफ नर्स पारस्परिक स्थानांतरण सहायता पोर्टल</div>
            <div className="font-mono text-emerald-400">Advt No: 23/2025 · Order: 880(6B)</div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {nocModalData && (
        <NOCApplicationModal
          candidateA={nocModalData.candidateA}
          candidateB={nocModalData.candidateB}
          onClose={() => setNocModalData(null)}
        />
      )}

      {isProfileModalOpen && (
        <MyProfileModal
          currentUser={currentUser}
          candidates={candidates}
          onSaveProfile={handleSaveProfile}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}

      {isAddModalOpen && (
        <AddCandidateModal
          onAddCandidate={handleAddCandidate}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  );
}

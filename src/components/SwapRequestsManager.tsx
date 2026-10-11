import React, { useState } from 'react';
import { SwapRequest, Candidate } from '../types';
import { 
  SendHorizontal, 
  Inbox, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MessageCircle, 
  FileText, 
  Trash2, 
  ArrowLeftRight,
  UserCheck
} from 'lucide-react';

interface SwapRequestsManagerProps {
  requests: SwapRequest[];
  onUpdateRequestStatus: (requestId: string, status: 'accepted' | 'declined') => void;
  onDeleteRequest: (requestId: string) => void;
  onGenerateNOCForRequest: (req: SwapRequest) => void;
  currentUser: Candidate | null;
}

export const SwapRequestsManager: React.FC<SwapRequestsManagerProps> = ({
  requests,
  onUpdateRequestStatus,
  onDeleteRequest,
  onGenerateNOCForRequest,
  currentUser,
}) => {
  const [tab, setTab] = useState<'all' | 'pending' | 'accepted'>('all');

  const filteredRequests = requests.filter((r) => {
    if (tab === 'pending') return r.status === 'pending';
    if (tab === 'accepted') return r.status === 'accepted';
    return true;
  });

  const getWhatsAppLink = (req: SwapRequest) => {
    const msg = encodeURIComponent(
      `नमस्ते ${req.toCandidateName} जी,\n\nमैं ${req.fromCandidateName} बोल रहा/रही हूँ (BTSC Staff Nurse Advt 23/2025, App No: ${req.fromApplicationNo})।\n\nमैंने पोर्टल पर आपके साथ पारस्परिक स्थानांतरण (Mutual Transfer) का अनुरोध भेजा था:\n- मेरा गृह जिला: ${req.fromHomeDistrict} (पदस्थापित: ${req.fromPostingPlace})\n- आपका गृह जिला: ${req.toHomeDistrict} (पदस्थापित: ${req.toPostingPlace})\n\nकृपया संपर्क करें ताकि हम पारस्परिक अनापत्ति (Joint NOC) की प्रक्रिया आगे बढ़ा सकें।`
    );
    const phone = req.toPhone || '919876543210';
    return `https://wa.me/${phone.replace(/\D/g, '')}?text=${msg}`;
  };

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <SendHorizontal className="w-4 h-4 text-emerald-700" />
              <span>पारस्परिक स्थानांतरण अनुरोध (Mutual Swap Requests Hub)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              आपके द्वारा भेजे गए और प्राप्त पारस्परिक स्थानांतरण प्रस्तावों की वर्तमान स्थिति
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setTab('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                tab === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              सभी ({requests.length})
            </button>
            <button
              onClick={() => setTab('pending')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                tab === 'pending' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              प्रतीक्षारत (Pending) ({requests.filter((r) => r.status === 'pending').length})
            </button>
            <button
              onClick={() => setTab('accepted')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                tab === 'accepted' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              स्वीकृत (Accepted) ({requests.filter((r) => r.status === 'accepted').length})
            </button>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">
            <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="font-bold text-slate-800 text-sm">अभी कोई अनुरोध नहीं भेजा गया है</h3>
            <p className="mt-1 max-w-sm mx-auto">
              'म्यूचुअल मैच ढूंढें' टैब में जाकर किसी भी मेल खाने वाले अभ्यर्थी को स्वैप अनुरोध भेजें।
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {filteredRequests.map((req) => (
              <div
                key={req.id}
                className={`p-4 rounded-xl border text-xs transition-all ${
                  req.status === 'accepted'
                    ? 'border-emerald-300 bg-emerald-50/30'
                    : req.status === 'declined'
                    ? 'border-rose-200 bg-rose-50/20'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    {req.status === 'accepted' && (
                      <span className="flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>स्वीकृत (Mutual Agreement Accepted)</span>
                      </span>
                    )}
                    {req.status === 'pending' && (
                      <span className="flex items-center gap-1 font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>प्रतीक्षारत (Pending Response)</span>
                      </span>
                    )}
                    {req.status === 'declined' && (
                      <span className="flex items-center gap-1 font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded text-[11px]">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        <span>अस्वीकृत (Declined)</span>
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400 font-mono">
                      दिनांक: {new Date(req.createdAt).toLocaleDateString('hi-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onDeleteRequest(req.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                      title="अनुरोध हटाएं"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Sender & Receiver Card Pair */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  {/* Sender side */}
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">प्रेषक (Requester)</span>
                    <div className="font-bold text-slate-900 mt-0.5">{req.fromCandidateName}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{req.fromApplicationNo}</div>
                    <div className="mt-1 text-[11px] text-slate-600">
                      गृह: <strong className="text-slate-800">{req.fromHomeDistrict}</strong>
                    </div>
                    <div className="text-[11px] text-slate-600 truncate" title={req.fromPostingPlace}>
                      पदस्थापन: {req.fromPostingPlace}
                    </div>
                  </div>

                  {/* Target side */}
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">प्राप्तकर्ता (Target Nurse)</span>
                    <div className="font-bold text-slate-900 mt-0.5">{req.toCandidateName}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{req.toApplicationNo}</div>
                    <div className="mt-1 text-[11px] text-slate-600">
                      गृह: <strong className="text-slate-800">{req.toHomeDistrict}</strong>
                    </div>
                    <div className="text-[11px] text-slate-600 truncate" title={req.toPostingPlace}>
                      पदस्थापन: {req.toPostingPlace}
                    </div>
                  </div>
                </div>

                {/* Message note if provided */}
                {req.message && (
                  <div className="p-2.5 bg-slate-100/70 rounded-lg text-[11px] text-slate-700 mb-3 border border-slate-200/50">
                    <strong>संदेश:</strong> "{req.message}"
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <a
                      href={getWhatsAppLink(req)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp पर बात करें</span>
                    </a>

                    {req.status === 'accepted' && (
                      <button
                        onClick={() => onGenerateNOCForRequest(req)}
                        className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>संयुक्त NOC आवेदन तैयार करें</span>
                      </button>
                    )}
                  </div>

                  {/* Simulate Status Change for UI demonstration */}
                  {req.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateRequestStatus(req.id, 'accepted')}
                        className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        ✓ स्वीकार करें (Accept)
                      </button>
                      <button
                        onClick={() => onUpdateRequestStatus(req.id, 'declined')}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        ✕ अस्वीकार करें (Decline)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

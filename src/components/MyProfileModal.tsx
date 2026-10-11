import React, { useState } from 'react';
import { Candidate } from '../types';
import { BIHAR_DISTRICTS } from '../data/biharDistricts';
import { ShieldCheck, UserCheck, Phone, MapPin, Building2, Check, X } from 'lucide-react';

interface MyProfileModalProps {
  currentUser: Candidate | null;
  candidates: Candidate[];
  onSaveProfile: (updatedCandidate: Candidate) => void;
  onClose: () => void;
}

export const MyProfileModal: React.FC<MyProfileModalProps> = ({
  currentUser,
  candidates,
  onSaveProfile,
  onClose,
}) => {
  const [selectedAppNo, setSelectedAppNo] = useState<string>(currentUser?.applicationNo || '');
  const [phone, setPhone] = useState<string>(currentUser?.phone || '');
  const [whatsapp, setWhatsapp] = useState<string>(currentUser?.whatsapp || currentUser?.phone || '');
  const [notes, setNotes] = useState<string>(currentUser?.notes || '');
  const [preferredDistricts, setPreferredDistricts] = useState<string[]>(
    currentUser?.preferredDistricts || (currentUser ? [currentUser.homeDistrict] : [])
  );
  const [swapStatus, setSwapStatus] = useState<'open' | 'request_pending' | 'swapped'>(
    currentUser?.swapStatus || 'open'
  );

  const matchedFromDb = candidates.find((c) => c.applicationNo === selectedAppNo);

  const handleToggleDistrict = (dist: string) => {
    if (preferredDistricts.includes(dist)) {
      setPreferredDistricts(preferredDistricts.filter((d) => d !== dist));
    } else {
      if (preferredDistricts.length < 4) {
        setPreferredDistricts([...preferredDistricts, dist]);
      }
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchedFromDb) return;

    const updated: Candidate = {
      ...matchedFromDb,
      phone,
      whatsapp: whatsapp || phone,
      notes,
      preferredDistricts: preferredDistricts.length > 0 ? preferredDistricts : [matchedFromDb.homeDistrict],
      swapStatus,
      isRegistered: true,
    };

    onSaveProfile(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-scaleUp max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">
              मेरी प्रोफ़ाइल एवं संपर्क विवरण (Claim & Setup Profile)
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-4 text-xs">
          {/* Select Candidate Step */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              1. सूची में अपना नाम/आवेदन संख्या चुनें:
            </label>
            <select
              value={selectedAppNo}
              onChange={(e) => {
                setSelectedAppNo(e.target.value);
                const found = candidates.find((c) => c.applicationNo === e.target.value);
                if (found) {
                  setPreferredDistricts([found.homeDistrict]);
                }
              }}
              required
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="">-- अपना नाम या आवेदन संख्या चुनें --</option>
              {candidates.map((c) => (
                <option key={c.id} value={c.applicationNo}>
                  {c.name} ({c.applicationNo}) - गृह: {c.homeDistrict} ➔ पदस्थापित: {c.postingDistrict}
                </option>
              ))}
            </select>
          </div>

          {/* Candidate Card Summary */}
          {matchedFromDb && (
            <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">{matchedFromDb.name}</span>
                <span className="font-mono text-[11px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                  Merit: #{matchedFromDb.meritNo}
                </span>
              </div>
              <div className="text-[11px] text-slate-600">
                पिता: {matchedFromDb.fatherName} · कोटि: <strong>{matchedFromDb.category}</strong>
              </div>
              <div className="text-[11px] text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>गृह जिला: <strong>{matchedFromDb.homeDistrict}</strong></span>
              </div>
              <div className="text-[11px] text-slate-700 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                <span>पदस्थापन स्थल: <strong>{matchedFromDb.postingPlace}</strong> ({matchedFromDb.postingDistrict})</span>
              </div>
            </div>
          )}

          {/* Phone & WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                मोबाइल नंबर (Mobile Number)
              </label>
              <input
                type="tel"
                placeholder="उदा० 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                WhatsApp नंबर (सीधे चैट लिंक हेतु)
              </label>
              <input
                type="tel"
                placeholder="उदा० 9876543210"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono"
              />
            </div>
          </div>

          {/* Preferred Districts Multi-Select */}
          <div>
            <label className="block font-medium text-slate-700 mb-1">
              वांछित जिले (गृह जिला + निकटवर्ती जिले, अधिकतम 4 चुनें):
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 bg-slate-50 rounded-lg border border-slate-200">
              {Object.keys(BIHAR_DISTRICTS).map((dist) => {
                const isSelected = preferredDistricts.includes(dist);
                return (
                  <button
                    type="button"
                    key={dist}
                    onClick={() => handleToggleDistrict(dist)}
                    className={`px-2 py-1 rounded text-[11px] transition-colors cursor-pointer flex items-center gap-1 ${
                      isSelected
                        ? 'bg-emerald-800 text-white font-semibold'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span>{dist}</span>
                    {isSelected && <Check className="w-3 h-3" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Transfer Status */}
          <div>
            <label className="block font-medium text-slate-700 mb-1">
              वर्तमान स्थिति (Swap Status)
            </label>
            <select
              value={swapStatus}
              onChange={(e) => setSwapStatus(e.target.value as any)}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              <option value="open">🟢 म्यूचुअल ट्रांसफर खोज रहे हैं (Looking for Swap)</option>
              <option value="request_pending">🟡 बातचीत जारी है (In Discussion)</option>
              <option value="swapped">🔵 ट्रांसफर तय हो चुका है (Already Matched)</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block font-medium text-slate-700 mb-1">
              अतिरिक्त विवरण / टिप्पणी (Notes for matching candidates)
            </label>
            <textarea
              rows={2}
              placeholder="उदा० तत्काल रिलीविंग उपलब्ध है। केवल गृह जिला या निकटवर्ती अस्पताल में इच्छुक।"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium cursor-pointer"
            >
              रद्द करें
            </button>
            <button
              type="submit"
              disabled={!matchedFromDb}
              className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-bold shadow-xs cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              प्रोफ़ाइल सुरक्षित करें (Save Profile)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

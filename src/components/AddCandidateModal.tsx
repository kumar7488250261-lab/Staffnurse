import React, { useState } from 'react';
import { Candidate } from '../types';
import { BIHAR_DISTRICTS, inferDistrictFromPosting } from '../data/biharDistricts';
import { PlusCircle, X, CheckCircle2, UserPlus } from 'lucide-react';

interface AddCandidateModalProps {
  onAddCandidate: (newCandidate: Candidate) => void;
  onClose: () => void;
}

export const AddCandidateModal: React.FC<AddCandidateModalProps> = ({
  onAddCandidate,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [applicationNo, setApplicationNo] = useState('');
  const [meritNo, setMeritNo] = useState('');
  const [dob, setDob] = useState('');
  const [category, setCategory] = useState('BC');
  const [homeDistrict, setHomeDistrict] = useState('Patna');
  const [postingPlace, setPostingPlace] = useState('');
  const [postingDistrict, setPostingDistrict] = useState('East Champaran');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const handlePostingPlaceChange = (value: string) => {
    setPostingPlace(value);
    const inferred = inferDistrictFromPosting(value);
    if (inferred && inferred !== 'Bihar') {
      setPostingDistrict(inferred);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !applicationNo) return;

    const newCandidate: Candidate = {
      id: applicationNo.trim().toUpperCase(),
      srNo: Math.floor(Math.random() * 5000) + 1000,
      applicationNo: applicationNo.trim().toUpperCase(),
      name: name.trim().toUpperCase(),
      fatherName: fatherName.trim().toUpperCase(),
      dob: dob || '01/01/1998',
      meritNo: parseInt(meritNo) || 5000,
      category,
      selectionCategory: category,
      homeDistrict,
      postingPlace: postingPlace.trim() || `Sadar Hospital, ${postingDistrict}`,
      postingDistrict,
      phone: phone.trim(),
      whatsapp: whatsapp.trim() || phone.trim(),
      preferredDistricts: [homeDistrict],
      isRegistered: true,
      swapStatus: 'open',
    };

    onAddCandidate(newCandidate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-scaleUp max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">
              नया अभ्यर्थी विवरण जोड़ें (Add Your Posting Entry)
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div className="p-2.5 bg-emerald-50 rounded-lg text-[11px] text-emerald-900 border border-emerald-200">
            विभागीय आदेश 880(6B) में से अपना विवरण दर्ज करें ताकि अन्य नर्स आपसे पारस्परिक स्थानांतरण के लिए संपर्क कर सकें।
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                अभ्यर्थी का नाम (Candidate Name) *
              </label>
              <input
                type="text"
                required
                placeholder="उदा० RASHMI KUMARI"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 uppercase"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                आवेदन संख्या (Application No) *
              </label>
              <input
                type="text"
                required
                placeholder="उदा० BRS012345"
                value={applicationNo}
                onChange={(e) => setApplicationNo(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono uppercase"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                पिता का नाम (Father's Name)
              </label>
              <input
                type="text"
                placeholder="पिता का नाम"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 uppercase"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                समेकित मेधा क्रमांक (Merit No)
              </label>
              <input
                type="number"
                placeholder="उदा० 4250"
                value={meritNo}
                onChange={(e) => setMeritNo(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                कोटि (Category)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
              >
                <option value="UR">UR (सामान्य)</option>
                <option value="BC">BC (पिछड़ा वर्ग)</option>
                <option value="EBC">EBC (अत्यंत पिछड़ा)</option>
                <option value="SC">SC (अनुसूचित जाति)</option>
                <option value="ST">ST (अनुसूचित जनजाति)</option>
                <option value="EWS">EWS (आर्थिक रूप से कमजोर)</option>
                <option value="WBC">WBC (महिला पिछड़ा वर्ग)</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                गृह जिला (Home District) *
              </label>
              <select
                value={homeDistrict}
                onChange={(e) => setHomeDistrict(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
              >
                {Object.keys(BIHAR_DISTRICTS).map((d) => (
                  <option key={d} value={d}>
                    {d} ({BIHAR_DISTRICTS[d]?.nameHindi})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                पदस्थापन जिला (Posting District) *
              </label>
              <select
                value={postingDistrict}
                onChange={(e) => setPostingDistrict(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
              >
                {Object.keys(BIHAR_DISTRICTS).map((d) => (
                  <option key={d} value={d}>
                    {d} ({BIHAR_DISTRICTS[d]?.nameHindi})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              पदस्थापन अस्पताल / संस्थान (Exact Posting Hospital Name) *
            </label>
            <input
              type="text"
              required
              placeholder="उदा० Sub Divisional Hospital, Bagaha, West Champaran"
              value={postingPlace}
              onChange={(e) => handlePostingPlaceChange(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                मोबाइल नंबर (Mobile)
              </label>
              <input
                type="tel"
                placeholder="उदा० 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                WhatsApp नंबर
              </label>
              <input
                type="tel"
                placeholder="उदा० 9876543210"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono"
              />
            </div>
          </div>

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
              className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>विवरण जोड़ें व मैच देखें</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

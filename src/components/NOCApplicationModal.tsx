import React, { useRef } from 'react';
import { Candidate } from '../types';
import { Printer, Download, X, FileText, CheckCircle2 } from 'lucide-react';

interface NOCApplicationModalProps {
  candidateA: Candidate;
  candidateB: Candidate;
  onClose: () => void;
}

export const NOCApplicationModal: React.FC<NOCApplicationModalProps> = ({
  candidateA,
  candidateB,
  onClose,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const today = new Date().toLocaleDateString('hi-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 my-8">
        {/* Modal Controls Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">
              पारस्परिक स्थानांतरण संयुक्त आवेदन पत्र (Mutual Transfer Application)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>प्रिंट / PDF सेव करें</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Application Letter */}
        <div 
          ref={printRef}
          className="mt-4 p-8 bg-white border border-slate-300 rounded-xl font-serif text-slate-900 leading-relaxed text-sm print:border-0 print:p-0 print:m-0"
        >
          {/* Header */}
          <div className="text-center pb-4 border-b-2 border-slate-900 mb-6">
            <h2 className="text-lg font-bold tracking-wide">
              बिहार सरकार || स्वास्थ्य विभाग
            </h2>
            <h3 className="text-base font-semibold">
              निदेशालय स्वास्थ्य सेवाएँ, बिहार, पटना
            </h3>
            <p className="text-xs italic text-slate-700 mt-1">
              (बिहार परिचारिका संवर्ग - स्टॉफ नर्स ग्रेड 'A' पारस्परिक स्थानांतरण हेतु संयुक्त अभ्यावेदन)
            </p>
          </div>

          {/* Recipient */}
          <div className="space-y-1 mb-5">
            <p className="font-bold">सेवा में,</p>
            <p className="ml-4">निदेशक प्रमुख (नर्र्सिंग),</p>
            <p className="ml-4">स्वास्थ्य सेवाएँ, स्वास्थ्य विभाग,</p>
            <p className="ml-4">बिहार, पटना।</p>
            <p className="ml-4 font-semibold text-xs mt-2 text-slate-800">
              द्वारा: उचित माध्यम (अधीक्षक / असैन्य शल्य चिकित्सक-सह-मुख्य चिकित्सा पदाधिकारी)
            </p>
          </div>

          {/* Subject */}
          <div className="mb-5 bg-slate-50 p-3 rounded border border-slate-200">
            <p className="font-bold">
              विषय: बिहार तकनीकी सेवा आयोग, पटना विज्ञापन संख्या-23/2025, विभागीय आदेश सं०-880(6B) दिनांक 08/10/2026 के आलोक में स्टॉफ नर्स पद पर पारस्परिक स्थानांतरण (Mutual Transfer) की स्वीकृति के संबंध में।
            </p>
          </div>

          {/* Body */}
          <div className="space-y-4 text-justify">
            <p>महाशय,</p>
            <p className="indent-8">
              सविनय निवेदन है कि हम दोनों अधोहस्ताक्षरी अभ्यर्थी बिहार तकनीकी सेवा आयोग, पटना के विज्ञापन संख्या-23/2025 के तहत बिहार परिचारिका संवर्ग के अंतर्गत मूल कोटि स्टॉफ नर्स के पद पर स्वास्थ्य विभाग, बिहार के आदेश ज्ञापांक 880(6B) दिनांक 08/10/2026 द्वारा औपबंधिक रूप से नियुक्त एवं पदस्थापित किए गए हैं।
            </p>
            <p className="indent-8">
              हम दोनों अभ्यर्थी पारिवारिक कारणों एवं अपने-अपने गृह जिले में पदस्थापन के उद्देश्य से अपनी पूर्ण सहमति से बिना किसी दबाव के <strong>पारस्परिक स्थानांतरण (Mutual Transfer)</strong> हेतु संयुक्त रूप से यह आवेदन प्रस्तुत कर रहे हैं। हमारे पदस्थापन एवं गृह जिले का पूर्ण विवरण निम्नानुसार है:
            </p>

            {/* Candidate Details Table */}
            <div className="my-4 overflow-x-auto">
              <table className="w-full border-collapse border border-slate-400 text-xs text-left">
                <thead>
                  <tr className="bg-slate-100 font-bold">
                    <th className="border border-slate-400 p-2 text-center w-10">क्र०</th>
                    <th className="border border-slate-400 p-2">विवरण</th>
                    <th className="border border-slate-400 p-2">प्रथम अभ्यर्थी (नर्स A)</th>
                    <th className="border border-slate-400 p-2">द्वितीय अभ्यर्थी (नर्स B)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-400 p-2 text-center font-bold">1</td>
                    <td className="border border-slate-400 p-2 font-semibold">अभ्यर्थी का नाम</td>
                    <td className="border border-slate-400 p-2 font-bold text-slate-900">{candidateA.name}</td>
                    <td className="border border-slate-400 p-2 font-bold text-slate-900">{candidateB.name}</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-2 text-center font-bold">2</td>
                    <td className="border border-slate-400 p-2 font-semibold">पिता का नाम</td>
                    <td className="border border-slate-400 p-2">{candidateA.fatherName}</td>
                    <td className="border border-slate-400 p-2">{candidateB.fatherName}</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-2 text-center font-bold">3</td>
                    <td className="border border-slate-400 p-2 font-semibold">आवेदन संख्या (App No)</td>
                    <td className="border border-slate-400 p-2 font-mono font-bold">{candidateA.applicationNo}</td>
                    <td className="border border-slate-400 p-2 font-mono font-bold">{candidateB.applicationNo}</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-2 text-center font-bold">4</td>
                    <td className="border border-slate-400 p-2 font-semibold">समेकित मेधा क्रमांक (Merit)</td>
                    <td className="border border-slate-400 p-2 font-mono">#{candidateA.meritNo}</td>
                    <td className="border border-slate-400 p-2 font-mono">#{candidateB.meritNo}</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-2 text-center font-bold">5</td>
                    <td className="border border-slate-400 p-2 font-semibold">आरक्षण कोटि (Category)</td>
                    <td className="border border-slate-400 p-2">{candidateA.category}</td>
                    <td className="border border-slate-400 p-2">{candidateB.category}</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-2 text-center font-bold">6</td>
                    <td className="border border-slate-400 p-2 font-semibold">गृह जिला (Home District)</td>
                    <td className="border border-slate-400 p-2 font-bold text-emerald-900">{candidateA.homeDistrict}</td>
                    <td className="border border-slate-400 p-2 font-bold text-emerald-900">{candidateB.homeDistrict}</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-2 text-center font-bold">7</td>
                    <td className="border border-slate-400 p-2 font-semibold">वर्तमान पदस्थापन स्थल</td>
                    <td className="border border-slate-400 p-2">{candidateA.postingPlace} ({candidateA.postingDistrict})</td>
                    <td className="border border-slate-400 p-2">{candidateB.postingPlace} ({candidateB.postingDistrict})</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-2 text-center font-bold">8</td>
                    <td className="border border-slate-400 p-2 font-semibold">वांछित पदस्थापन स्थल (Swap To)</td>
                    <td className="border border-slate-400 p-2 font-bold text-blue-900">{candidateB.postingPlace}</td>
                    <td className="border border-slate-400 p-2 font-bold text-blue-900">{candidateA.postingPlace}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Declaration */}
            <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs space-y-1.5">
              <p className="font-bold">घोषणा (Joint Declaration):</p>
              <p>1. हम दोनों यह घोषणा करते हैं कि हम इस पारस्परिक स्थानांतरण के लिए स्वेच्छा से सहमत हैं।</p>
              <p>2. हम विभागीय आदेश की कंडिका-5 के अनुसार निर्धारित वरीयता नियमों तथा सेवा शर्तों का पालन करेंगे।</p>
              <p>3. इस स्थानांतरण हेतु हम सरकार से किसी भी प्रकार के यात्रा भत्ता (TA/DA) का दावा नहीं करेंगे।</p>
            </div>

            <p className="indent-8">
              अतः श्रीमान् से विनम्र प्रार्थना है कि उपरोक्त तथ्यों एवं परिस्थितियों पर सहानुभूतिपूर्वक विचार करते हुए हम दोनों अभ्यर्थियों के पारस्परिक स्थानांतरण की स्वीकृति प्रदान करने की कृपा की जाए। इसके लिए हम सदैव आपके आभारी रहेंगे।
            </p>
          </div>

          {/* Signatures */}
          <div className="mt-12 pt-6 border-t border-slate-300 grid grid-cols-2 gap-8 text-xs">
            <div>
              <p className="font-bold">हस्ताक्षर (प्रथम अभ्यर्थी):</p>
              <div className="h-14"></div>
              <p className="font-semibold text-slate-900">{candidateA.name}</p>
              <p className="text-slate-600 font-mono">App No: {candidateA.applicationNo}</p>
              <p className="text-slate-600">पदस्थापन: {candidateA.postingDistrict}</p>
              <p className="text-slate-500 text-[11px]">दिनांक: {today}</p>
            </div>

            <div className="text-right">
              <p className="font-bold">हस्ताक्षर (द्वितीय अभ्यर्थी):</p>
              <div className="h-14"></div>
              <p className="font-semibold text-slate-900">{candidateB.name}</p>
              <p className="text-slate-600 font-mono">App No: {candidateB.applicationNo}</p>
              <p className="text-slate-600">पदस्थापन: {candidateB.postingDistrict}</p>
              <p className="text-slate-500 text-[11px]">दिनांक: {today}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

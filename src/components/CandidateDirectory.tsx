import React, { useState, useMemo } from 'react';
import { Candidate } from '../types';
import { BIHAR_DISTRICTS } from '../data/biharDistricts';
import { 
  Search, 
  Filter, 
  MapPin, 
  Building2, 
  ArrowLeftRight, 
  Table, 
  LayoutGrid, 
  Download,
  Users,
  ChevronLeft,
  ChevronRight,
  SendHorizontal
} from 'lucide-react';

interface CandidateDirectoryProps {
  candidates: Candidate[];
  onSelectCandidateForMatch: (candidate: Candidate) => void;
  currentUser: Candidate | null;
}

export const CandidateDirectory: React.FC<CandidateDirectoryProps> = ({
  candidates,
  onSelectCandidateForMatch,
  currentUser,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHomeDistrict, setSelectedHomeDistrict] = useState('all');
  const [selectedPostingDistrict, setSelectedPostingDistrict] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [sortBy, setSortBy] = useState<'merit' | 'name' | 'homeDistrict' | 'srNo'>('merit');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  // Filter list
  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm.trim() ||
        c.name.toLowerCase().includes(q) ||
        c.applicationNo.toLowerCase().includes(q) ||
        c.fatherName.toLowerCase().includes(q) ||
        c.postingPlace.toLowerCase().includes(q) ||
        c.homeDistrict.toLowerCase().includes(q);

      const matchesHome =
        selectedHomeDistrict === 'all' || c.homeDistrict === selectedHomeDistrict;
      const matchesPosting =
        selectedPostingDistrict === 'all' || c.postingDistrict === selectedPostingDistrict;
      const matchesCat =
        selectedCategory === 'all' || c.category === selectedCategory || c.selectionCategory === selectedCategory;

      return matchesSearch && matchesHome && matchesPosting && matchesCat;
    });
  }, [candidates, searchTerm, selectedHomeDistrict, selectedPostingDistrict, selectedCategory]);

  // Sort list
  const sortedCandidates = useMemo(() => {
    return [...filteredCandidates].sort((a, b) => {
      let comp = 0;
      if (sortBy === 'merit') comp = a.meritNo - b.meritNo;
      else if (sortBy === 'srNo') comp = a.srNo - b.srNo;
      else if (sortBy === 'name') comp = a.name.localeCompare(b.name);
      else if (sortBy === 'homeDistrict') comp = a.homeDistrict.localeCompare(b.homeDistrict);
      return sortOrder === 'asc' ? comp : -comp;
    });
  }, [filteredCandidates, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedCandidates.length / pageSize) || 1;
  const paginatedCandidates = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedCandidates.slice(start, start + pageSize);
  }, [sortedCandidates, currentPage, pageSize]);

  // Unique lists for dropdowns
  const uniqueHomeDistricts = useMemo(() => {
    return Array.from(new Set(candidates.map((c) => c.homeDistrict))).sort();
  }, [candidates]);

  const uniquePostingDistricts = useMemo(() => {
    return Array.from(new Set(candidates.map((c) => c.postingDistrict))).sort();
  }, [candidates]);

  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(candidates.map((c) => c.category))).sort();
  }, [candidates]);

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Sr No,Application No,Name,Father Name,DOB,Merit No,Category,Home District,Posting Place,Posting District\n'];
    const rows = sortedCandidates.map(
      (c) =>
        `"${c.srNo}","${c.applicationNo}","${c.name}","${c.fatherName}","${c.dob}","${c.meritNo}","${c.category}","${c.homeDistrict}","${c.postingPlace}","${c.postingDistrict}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `BTSC_Staff_Nurse_Posting_List_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="नाम, आवेदन संख्या (BRS...), पिता का नाम, अस्पताल खोजें..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="तालिका दृश्य (Table View)"
              >
                <Table className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="कार्ड दृश्य (Grid View)"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Export */}
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV डाउनलोड</span>
            </button>
          </div>
        </div>

        {/* Dropdown Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-2 border-t border-slate-100 text-xs">
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              गृह जिला (Home District)
            </label>
            <select
              value={selectedHomeDistrict}
              onChange={(e) => {
                setSelectedHomeDistrict(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              <option value="all">सभी गृह जिले (All Home)</option>
              {uniqueHomeDistricts.map((d) => (
                <option key={d} value={d}>
                  {d} {BIHAR_DISTRICTS[d] ? `(${BIHAR_DISTRICTS[d].nameHindi})` : ''}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              पदस्थापन जिला (Posting District)
            </label>
            <select
              value={selectedPostingDistrict}
              onChange={(e) => {
                setSelectedPostingDistrict(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              <option value="all">सभी पदस्थापन जिले (All Posting)</option>
              {uniquePostingDistricts.map((d) => (
                <option key={d} value={d}>
                  {d} {BIHAR_DISTRICTS[d] ? `(${BIHAR_DISTRICTS[d].nameHindi})` : ''}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              कोटि (Category)
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              <option value="all">सभी कोटियां (All Categories)</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              क्रमबद्ध (Sort By)
            </label>
            <div className="flex gap-1.5">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="flex-1 p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600"
              >
                <option value="merit">मेधा क्रमांक (Merit No)</option>
                <option value="name">नाम (Name)</option>
                <option value="homeDistrict">गृह जिला (Home District)</option>
                <option value="srNo">क्रम संख्या (Sr No)</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-xs font-bold"
                title="आरोही/अवरोही क्रम"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>

        {/* Results Count & Active Filters Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <div>
            कुल परिणाम: <strong className="text-slate-900">{filteredCandidates.length}</strong> अभ्यर्थी
          </div>
          {(selectedHomeDistrict !== 'all' || selectedPostingDistrict !== 'all' || selectedCategory !== 'all' || searchTerm) && (
            <button
              onClick={() => {
                setSelectedHomeDistrict('all');
                setSelectedPostingDistrict('all');
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              className="text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
            >
              फ़िल्टर रीसेट करें (Clear Filters)
            </button>
          )}
        </div>
      </div>

      {/* Directory Content */}
      {viewMode === 'table' ? (
        /* Dense Official Table View */
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-semibold">
                  <th className="p-3 w-12 text-center">क्र०</th>
                  <th className="p-3">आवेदन सं० (App No)</th>
                  <th className="p-3">अभ्यर्थी का नाम व पिता</th>
                  <th className="p-3">जन्मतिथि</th>
                  <th className="p-3 text-center">मेधा</th>
                  <th className="p-3">कोटि</th>
                  <th className="p-3">गृह जिला (Home)</th>
                  <th className="p-3">पदस्थापन स्थल (Posting Place)</th>
                  <th className="p-3 text-right">कार्रवाई</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedCandidates.map((c) => (
                  <tr key={c.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="p-3 text-center text-slate-400 font-mono text-[11px]">
                      {c.srNo}
                    </td>
                    <td className="p-3 font-mono font-medium text-slate-900 whitespace-nowrap">
                      {c.applicationNo}
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{c.name}</div>
                      <div className="text-[11px] text-slate-500">{c.fatherName}</div>
                    </td>
                    <td className="p-3 text-slate-600 whitespace-nowrap text-[11px]">
                      {c.dob}
                    </td>
                    <td className="p-3 text-center font-mono font-bold text-slate-800">
                      #{c.meritNo}
                    </td>
                    <td className="p-3">
                      <span className="font-medium text-slate-700">
                        {c.category}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-emerald-800 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        <span>{c.homeDistrict}</span>
                      </div>
                    </td>
                    <td className="p-3 max-w-xs">
                      <div className="text-slate-800 font-medium truncate" title={c.postingPlace}>
                        {c.postingPlace}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        जिला: <strong className="text-slate-700">{c.postingDistrict}</strong>
                      </div>
                    </td>
                    <td className="p-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => onSelectCandidateForMatch(c)}
                        className="px-2.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-md text-[11px] font-semibold transition-colors flex items-center gap-1 ml-auto cursor-pointer"
                        title="इनके लिए म्यूचुअल ट्रांसफर मैच खोजें"
                      >
                        <ArrowLeftRight className="w-3 h-3" />
                        <span>मैच खोजें</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid Card View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {paginatedCandidates.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all text-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2 mb-2.5">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm leading-tight">{c.name}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">पिता: {c.fatherName}</p>
                  </div>
                  <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold shrink-0">
                    {c.applicationNo}
                  </span>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">मेधा क्रमांक:</span>
                    <strong className="text-slate-800 font-mono">#{c.meritNo}</strong>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">कोटि (Category):</span>
                    <span className="font-semibold text-slate-800">{c.category}</span>
                  </div>
                  <div className="p-2 bg-emerald-50/60 rounded-lg border border-emerald-100/60">
                    <div className="text-[10px] text-emerald-800 font-medium">गृह जिला (Home District):</div>
                    <div className="text-xs font-bold text-emerald-900 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{c.homeDistrict}</span>
                    </div>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="text-[10px] text-slate-500 font-medium">वर्तमान पदस्थापन स्थल:</div>
                    <div className="text-xs font-medium text-slate-900 mt-0.5 line-clamp-2" title={c.postingPlace}>
                      {c.postingPlace}
                    </div>
                    <div className="text-[11px] text-slate-600 mt-1">
                      जिला: <strong className="text-slate-800">{c.postingDistrict}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => onSelectCandidateForMatch(c)}
                  className="w-full py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  <span>पारस्परिक मैच खोजें (Find Match)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="text-slate-500">
          पेज <strong className="text-slate-900">{currentPage}</strong> / <strong className="text-slate-900">{totalPages}</strong> (दिखाया जा रहा है {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, sortedCandidates.length)} / {sortedCandidates.length})
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 font-medium cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>पिछला</span>
          </button>

          <span className="px-3 py-1 font-bold text-slate-800 font-mono">
            {currentPage}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 font-medium cursor-pointer"
          >
            <span>अगला</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';

const StudentDirectory = ({ students, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('All');
  const [selectedClass, setSelectedClass] = useState('All');

  // Filtered Students Logic
  const filteredStudents = students.filter(std => {
    const matchesSearch = 
      std.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      std.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      std.phone?.includes(searchTerm);

    const matchesBoard = selectedBoard === 'All' || std.board === selectedBoard;
    const matchesClass = selectedClass === 'All' || std.class === selectedClass;

    return matchesSearch && matchesBoard && matchesClass;
  });

  return (
    <div className="space-y-6">
      {/* SEARCH & FILTERS BAR */}
      <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[11px] font-bold text-zinc-400 mb-1">Search Student</label>
          <input 
            type="text" 
            placeholder="Search by name, email or mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-zinc-400 mb-1">Filter by Board</label>
          <select 
            value={selectedBoard} 
            onChange={(e) => setSelectedBoard(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Boards</option>
            <option value="UP Board">UP Board</option>
            <option value="CBSE">CBSE Board</option>
            <option value="Computer Division">Computer Center</option>
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-zinc-400 mb-1">Filter by Class</label>
          <select 
            value={selectedClass} 
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Classes</option>
            <option value="Class 9th">Class 9th</option>
            <option value="Class 10th">Class 10th</option>
            <option value="Class 11th">Class 11th</option>
            <option value="Class 12th">Class 12th</option>
            <option value="ADCA / DCA">ADCA / DCA</option>
            <option value="Tally / Coding">Tally / Coding</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl">
        <h2 className="text-lg font-bold mb-4 text-cyan-400">🎓 Student Directory</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950 uppercase text-zinc-500 font-bold border-b border-zinc-800">
              <tr>
                <th className="p-3">Full Name</th>
                <th className="p-3">Email Address</th>
                <th className="p-3">Mobile</th>
                <th className="p-3">Class / Course</th>
                <th className="p-3">Board</th>
                <th className="p-3">Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="p-4 text-center text-zinc-500">Loading student records...</td></tr>
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map((std, idx) => (
                  <tr key={idx} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition">
                    <td className="p-3 font-bold text-white">{std.fullName || 'N/A'}</td>
                    <td className="p-3 text-zinc-400">{std.email || 'N/A'}</td>
                    <td className="p-3 text-zinc-400">{std.phone || 'N/A'}</td>
                    <td className="p-3 text-amber-400 font-semibold">{std.class || 'N/A'}</td>
                    <td className="p-3 text-cyan-400">{std.board || 'N/A'}</td>
                    <td className="p-3 text-zinc-500">
                      {std.createdAt ? new Date(std.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6" className="p-4 text-center text-zinc-500">No students match the criteria.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDirectory;
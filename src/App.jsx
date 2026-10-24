import { useState, useMemo } from 'react';
import StudentHeader from './components/StudentHeader';
import StudentMetrics from './components/StudentMetrics';
import StudentCard from './components/StudentCard';
import DeleteConfirmModal from './components/DeleteConfirmModal';

const INITIAL_STUDENTS = [
  {
    id: 1,
    rollNumber: 'SCH-2026-001',
    name: 'Aarav Sharma',
    department: 'Artificial Intelligence',
    email: 'aarav.sharma@aether.edu',
    semester: 4,
    gpa: 3.92,
    attendance: 94,
  },
  {
    id: 2,
    rollNumber: 'SCH-2026-002',
    name: 'Diya Parikh',
    department: 'Computer Applications',
    email: 'diya.parikh@aether.edu',
    semester: 4,
    gpa: 3.85,
    attendance: 88,
  },
  {
    id: 3,
    rollNumber: 'SCH-2026-003',
    name: 'Rohan Mehta',
    department: 'Data Science',
    email: 'rohan.mehta@aether.edu',
    semester: 6,
    gpa: 3.45,
    attendance: 72,
  },
  {
    id: 4,
    rollNumber: 'SCH-2026-004',
    name: 'Ananya Joshi',
    department: 'Cyber Security',
    email: 'ananya.joshi@aether.edu',
    semester: 2,
    gpa: 3.98,
    attendance: 98,
  },
];

export default function App() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [search, setSearch] = useState('');
  const [activeDept, setActiveDept] = useState('All');
  const [lastDeletedStudent, setLastDeletedStudent] = useState(null);

  // Departments list for filter tabs
  const departments = ['All', ...new Set(students.map((s) => s.department))];

  // Filtering based on search and department
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.rollNumber.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase());
      const matchesDept = activeDept === 'All' || s.department === activeDept;
      return matchesSearch && matchesDept;
    });
  }, [students, search, activeDept]);

  // Handle student record deletion
  const handleDeleteStudent = (id) => {
    const deleted = students.find((s) => s.id === id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setStudentToDelete(null);

    // Save for undo toast
    if (deleted) {
      setLastDeletedStudent(deleted);
      setTimeout(() => {
        setLastDeletedStudent((prev) => (prev?.id === deleted.id ? null : prev));
      }, 5000);
    }
  };

  // Undo deletion
  const handleUndo = () => {
    if (lastDeletedStudent) {
      setStudents((prev) => [...prev, lastDeletedStudent].sort((a, b) => a.id - b.id));
      setLastDeletedStudent(null);
    }
  };

  const honorsCount = students.filter((s) => s.gpa >= 3.8).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 pb-16">
      <StudentHeader totalStudents={students.length} honorsCount={honorsCount} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <StudentMetrics students={students} />

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
          {/* Department Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer whitespace-nowrap ${
                  activeDept === dept
                    ? 'bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, roll no, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-72 bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Roster Grid */}
        {filteredStudents.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl">
            <p className="text-slate-400 font-mono text-sm">No student records match the active filters.</p>
            {students.length === 0 && (
              <button
                onClick={() => setStudents(INITIAL_STUDENTS)}
                className="mt-4 px-4 py-2 bg-slate-800 text-cyan-300 font-mono text-xs rounded-xl hover:bg-slate-700 transition cursor-pointer"
              >
                Reload Sample Directory
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onRequestDelete={setStudentToDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Confirmation Modal */}
      {studentToDelete && (
        <DeleteConfirmModal
          student={studentToDelete}
          onCancel={() => setStudentToDelete(null)}
          onConfirm={handleDeleteStudent}
        />
      )}

      {/* Undo Banner / Toast */}
      {lastDeletedStudent && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 border border-rose-500/40 text-slate-200 shadow-2xl text-xs font-mono flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
          <span>Deleted record for <strong className="text-white">{lastDeletedStudent.name}</strong></span>
          <button
            onClick={handleUndo}
            className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold uppercase transition cursor-pointer border border-slate-700"
          >
            Undo
          </button>
        </div>
      )}
    </div>
  );
}
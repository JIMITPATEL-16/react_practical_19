export default function StudentMetrics({ students }) {
  const avgGpa = students.length
    ? (students.reduce((acc, s) => acc + s.gpa, 0) / students.length).toFixed(2)
    : '0.00';

  const departmentsCount = new Set(students.map((s) => s.department)).size;
  
  const avgAttendance = students.length
    ? Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length)
    : 0;

  const cards = [
    {
      label: 'Cohort Average GPA',
      val: avgGpa,
      sub: 'Standard 4.0 weighted scale',
      accent: 'from-cyan-500/20 to-blue-500/0 border-cyan-500/30 text-cyan-400',
    },
    {
      label: 'Departments Enrolled',
      val: departmentsCount,
      sub: 'Unique academic tracks',
      accent: 'from-indigo-500/20 to-purple-500/0 border-indigo-500/30 text-indigo-400',
    },
    {
      label: 'Overall Attendance',
      val: `${avgAttendance}%`,
      sub: 'Lecture & lab turnout rate',
      accent: 'from-fuchsia-500/20 to-pink-500/0 border-fuchsia-500/30 text-fuchsia-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {cards.map((c, i) => (
        <div
          key={i}
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-b bg-slate-900/60 p-5 border backdrop-blur-md transition-all hover:translate-y-[-2px] ${c.accent}`}
        >
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">{c.label}</p>
          <p className="text-3xl font-extrabold text-white mt-2 tracking-tight font-mono">{c.val}</p>
          <p className="text-xs text-slate-500 mt-1">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
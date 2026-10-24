export default function StudentCard({ student, onRequestDelete }) {
  const isHonorRoll = student.gpa >= 3.8;

  return (
    <div className="group relative rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5">
      <div>
        {/* Top Badges */}
        <div className="flex justify-between items-start gap-2 mb-4">
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300 border border-slate-700">
            {student.department}
          </span>
          <span
            className={`text-[11px] font-mono px-2 py-0.5 rounded-md font-semibold flex items-center gap-1.5 ${
              isHonorRoll
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                : 'bg-slate-800/60 text-slate-400 border border-slate-700'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isHonorRoll ? 'bg-indigo-400 animate-pulse' : 'bg-slate-500'}`}></span>
            GPA {student.gpa.toFixed(2)}
          </span>
        </div>

        {/* Student Avatar & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-mono font-bold text-base">
            {student.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
              {student.name}
            </h3>
            <p className="text-xs font-mono text-slate-500">{student.rollNumber}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs">
          <div className="flex justify-between text-slate-400">
            <span className="text-slate-500">Email:</span>
            <span className="font-mono truncate max-w-[170px]">{student.email}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span className="text-slate-500">Semester:</span>
            <span className="font-mono">Sem {student.semester}</span>
          </div>
        </div>

        {/* Attendance meter */}
        <div className="mt-4">
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-1">
            <span>Attendance Rate</span>
            <span>{student.attendance}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                student.attendance < 75 ? 'bg-amber-400' : 'bg-emerald-400'
              }`}
              style={{ width: `${student.attendance}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Delete Trigger */}
      <div className="pt-4 mt-5 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
          Enrolled 2026
        </span>
        <button
          onClick={() => onRequestDelete(student)}
          className="cursor-pointer px-3.5 py-1.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white font-mono text-xs font-semibold border border-rose-500/30 hover:border-transparent transition-all shadow-sm hover:shadow-rose-500/20 flex items-center gap-1.5"
        >
          <span>✕</span>
          <span>Expel Record</span>
        </button>
      </div>
    </div>
  );
}
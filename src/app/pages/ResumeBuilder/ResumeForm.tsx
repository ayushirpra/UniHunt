import { Plus, Trash2, Linkedin } from 'lucide-react';
import type { ResumeData, Education, Experience, Project } from '../../../types/resume';

const inputClass =
  'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500';

const labelClass = 'block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export function ResumeForm({ data, onChange }: Props) {
  const set = (patch: Partial<ResumeData>) => onChange({ ...data, ...patch });

  function updateItem<T>(arr: T[], index: number, patch: Partial<T>): T[] {
    return arr.map((item, i) => (i === index ? { ...item, ...patch } : item));
  }

  return (
    <div className="space-y-6">
      {/* Personal Details */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Personal Details</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className={labelClass}>Full Name</label>
            <input className={inputClass} placeholder="John Doe"
              value={data.personal.name}
              onChange={e => set({ personal: { ...data.personal, name: e.target.value } })} />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input className={inputClass} placeholder="john@email.com" type="email"
              value={data.personal.email}
              onChange={e => set({ personal: { ...data.personal, email: e.target.value } })} />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input className={inputClass} placeholder="+1 234 567 8900"
              value={data.personal.phone}
              onChange={e => set({ personal: { ...data.personal, phone: e.target.value } })} />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Location</label>
            <input className={inputClass} placeholder="New York, USA"
              value={data.personal.location}
              onChange={e => set({ personal: { ...data.personal, location: e.target.value } })} />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>LinkedIn URL</label>
            <div className="relative">
              <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input className={`${inputClass} pl-8`} placeholder="https://linkedin.com/in/yourname"
                value={data.personal.linkedin}
                onChange={e => set({ personal: { ...data.personal, linkedin: e.target.value } })} />
            </div>
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Professional Summary</label>
            <textarea className={`${inputClass} resize-none`} rows={3}
              placeholder="Brief summary about yourself..."
              value={data.personal.summary}
              onChange={e => set({ personal: { ...data.personal, summary: e.target.value } })} />
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Education</h3>
          <button
            onClick={() => set({ education: [...data.education, { school: '', degree: '', field: '', year: '' }] })}
            className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
            <Plus className="w-3 h-3" /> Add
          </button>
        </div>
        <div className="space-y-4">
          {data.education.map((edu, i) => (
            <div key={i} className="relative border border-gray-100 dark:border-gray-700 rounded-lg p-3">
              {data.education.length > 1 && (
                <button
                  onClick={() => set({ education: data.education.filter((_, idx) => idx !== i) })}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                  <label className={labelClass}>School / University</label>
                  <input className={inputClass} placeholder="MIT"
                    value={edu.school}
                    onChange={e => set({ education: updateItem<Education>(data.education, i, { school: e.target.value }) })} />
                </div>
                <div>
                  <label className={labelClass}>Degree</label>
                  <input className={inputClass} placeholder="Bachelor's"
                    value={edu.degree}
                    onChange={e => set({ education: updateItem<Education>(data.education, i, { degree: e.target.value }) })} />
                </div>
                <div>
                  <label className={labelClass}>Field of Study</label>
                  <input className={inputClass} placeholder="Computer Science"
                    value={edu.field}
                    onChange={e => set({ education: updateItem<Education>(data.education, i, { field: e.target.value }) })} />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Year</label>
                  <input className={inputClass} placeholder="2020 – 2024"
                    value={edu.year}
                    onChange={e => set({ education: updateItem<Education>(data.education, i, { year: e.target.value }) })} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Work Experience</h3>
          <button
            onClick={() => set({ experience: [...data.experience, { company: '', role: '', duration: '', description: '' }] })}
            className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
            <Plus className="w-3 h-3" /> Add
          </button>
        </div>
        <div className="space-y-4">
          {data.experience.map((exp, i) => (
            <div key={i} className="relative border border-gray-100 dark:border-gray-700 rounded-lg p-3">
              {data.experience.length > 1 && (
                <button
                  onClick={() => set({ experience: data.experience.filter((_, idx) => idx !== i) })}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>Company</label>
                  <input className={inputClass} placeholder="Google"
                    value={exp.company}
                    onChange={e => set({ experience: updateItem<Experience>(data.experience, i, { company: e.target.value }) })} />
                </div>
                <div>
                  <label className={labelClass}>Role</label>
                  <input className={inputClass} placeholder="Software Engineer"
                    value={exp.role}
                    onChange={e => set({ experience: updateItem<Experience>(data.experience, i, { role: e.target.value }) })} />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Duration</label>
                  <input className={inputClass} placeholder="Jan 2022 – Present"
                    value={exp.duration}
                    onChange={e => set({ experience: updateItem<Experience>(data.experience, i, { duration: e.target.value }) })} />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Description</label>
                  <textarea className={`${inputClass} resize-none`} rows={2}
                    placeholder="Key responsibilities and achievements..."
                    value={exp.description}
                    onChange={e => set({ experience: updateItem<Experience>(data.experience, i, { description: e.target.value }) })} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Skills</h3>
          <button
            onClick={() => set({ skills: [...data.skills, ''] })}
            className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
            <Plus className="w-3 h-3" /> Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, i) => (
            <div key={i} className="flex items-center gap-1 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1">
              <input
                className="bg-transparent text-sm text-gray-900 dark:text-white outline-none w-24"
                placeholder="e.g. React"
                value={skill}
                onChange={e => set({ skills: data.skills.map((s, idx) => idx === i ? e.target.value : s) })}
              />
              {data.skills.length > 1 && (
                <button
                  onClick={() => set({ skills: data.skills.filter((_, idx) => idx !== i) })}
                  className="text-gray-400 hover:text-red-500">
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Projects</h3>
          <button
            onClick={() => set({ projects: [...data.projects, { name: '', description: '', link: '' }] })}
            className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
            <Plus className="w-3 h-3" /> Add
          </button>
        </div>
        <div className="space-y-4">
          {data.projects.map((proj, i) => (
            <div key={i} className="relative border border-gray-100 dark:border-gray-700 rounded-lg p-3 space-y-2">
              {data.projects.length > 1 && (
                <button
                  onClick={() => set({ projects: data.projects.filter((_, idx) => idx !== i) })}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <div>
                <label className={labelClass}>Project Name</label>
                <input className={inputClass} placeholder="UniHunt AI"
                  value={proj.name}
                  onChange={e => set({ projects: updateItem<Project>(data.projects, i, { name: e.target.value }) })} />
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea className={`${inputClass} resize-none`} rows={2}
                  placeholder="What did you build and what technologies did you use?"
                  value={proj.description}
                  onChange={e => set({ projects: updateItem<Project>(data.projects, i, { description: e.target.value }) })} />
              </div>
              <div>
                <label className={labelClass}>Link (optional)</label>
                <input className={inputClass} placeholder="https://github.com/..."
                  value={proj.link}
                  onChange={e => set({ projects: updateItem<Project>(data.projects, i, { link: e.target.value }) })} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

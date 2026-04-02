import { forwardRef } from 'react';
import { Mail, Phone, MapPin, ExternalLink, Linkedin } from 'lucide-react';
import type { ResumeData, ResumeTemplate } from '../../../types/resume';

interface Props {
  data: ResumeData;
  template: ResumeTemplate;
}

export const ResumePreview = forwardRef<HTMLDivElement, Props>(({ data, template }, ref) => {
  const { personal, education, experience, skills, projects } = data;
  const filledSkills = skills.filter(Boolean);
  const filledEdu = education.filter(e => e.school);
  const filledExp = experience.filter(e => e.company);
  const filledProj = projects.filter(p => p.name);

  if (template === 'modern') {
    return (
      <div ref={ref} id="resume-preview"
        className="bg-white text-gray-900 w-full shadow-lg text-sm"
        style={{ minHeight: '1122px', padding: '40px', fontFamily: 'Inter, sans-serif' }}>
        <div className="border-b-2 border-indigo-600 pb-4 mb-5">
          <h1 className="text-3xl font-bold">{personal.name || 'Your Name'}</h1>
          <div className="flex flex-wrap gap-4 mt-2 text-gray-500 text-xs">
            {personal.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{personal.email}</span>}
            {personal.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{personal.phone}</span>}
            {personal.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{personal.location}</span>}
            {personal.linkedin && (
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-indigo-600 hover:underline">
                <Linkedin className="w-3 h-3" />{personal.linkedin.replace('https://www.', '').replace('https://', '')}
              </a>
            )}
          </div>
          {personal.summary && <p className="mt-3 text-gray-600 text-xs leading-relaxed">{personal.summary}</p>}
        </div>

        {filledExp.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">Experience</h2>
            {filledExp.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-start">
                  <div><p className="font-semibold">{exp.role}</p><p className="text-gray-500 text-xs">{exp.company}</p></div>
                  <p className="text-gray-400 text-xs shrink-0">{exp.duration}</p>
                </div>
                {exp.description && <p className="text-gray-600 text-xs mt-1 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {filledEdu.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">Education</h2>
            {filledEdu.map((edu, i) => (
              <div key={i} className="mb-3 flex justify-between items-start">
                <div>
                  <p className="font-semibold">{edu.school}</p>
                  <p className="text-gray-500 text-xs">{[edu.degree, edu.field].filter(Boolean).join(' in ')}</p>
                </div>
                <p className="text-gray-400 text-xs shrink-0">{edu.year}</p>
              </div>
            ))}
          </div>
        )}

        {filledSkills.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {filledSkills.map((skill, i) => (
                <span key={i} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {filledProj.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">Projects</h2>
            {filledProj.map((proj, i) => (
              <div key={i} className="mb-3">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{proj.name}</p>
                  {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-indigo-500"><ExternalLink className="w-3 h-3" /></a>}
                </div>
                {proj.description && <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">{proj.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (template === 'classic') {
    return (
      <div ref={ref} id="resume-preview"
        className="bg-white text-gray-900 w-full shadow-lg text-sm"
        style={{ minHeight: '1122px', padding: '48px', fontFamily: 'Georgia, serif' }}>
        <div className="text-center border-b border-gray-300 pb-4 mb-5">
          <h1 className="text-2xl font-bold">{personal.name || 'Your Name'}</h1>
          <div className="flex justify-center flex-wrap gap-4 mt-1 text-gray-500 text-xs">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.linkedin && (
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                {personal.linkedin.replace('https://www.', '').replace('https://', '')}
              </a>
            )}
          </div>
          {personal.summary && <p className="mt-2 text-gray-600 text-xs">{personal.summary}</p>}
        </div>

        {filledExp.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold uppercase border-b border-gray-300 pb-1 mb-3">Work Experience</h2>
            {filledExp.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between">
                  <p className="font-semibold">{exp.role} — {exp.company}</p>
                  <p className="text-gray-400 text-xs">{exp.duration}</p>
                </div>
                {exp.description && <p className="text-gray-600 text-xs mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {filledEdu.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold uppercase border-b border-gray-300 pb-1 mb-3">Education</h2>
            {filledEdu.map((edu, i) => (
              <div key={i} className="mb-2 flex justify-between">
                <div>
                  <p className="font-semibold">{edu.school}</p>
                  <p className="text-gray-500 text-xs">{[edu.degree, edu.field].filter(Boolean).join(' in ')}</p>
                </div>
                <p className="text-gray-400 text-xs">{edu.year}</p>
              </div>
            ))}
          </div>
        )}

        {filledSkills.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold uppercase border-b border-gray-300 pb-1 mb-3">Skills</h2>
            <p className="text-xs text-gray-700">{filledSkills.join(' · ')}</p>
          </div>
        )}

        {filledProj.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold uppercase border-b border-gray-300 pb-1 mb-3">Projects</h2>
            {filledProj.map((proj, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold">
                  {proj.name}
                  {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-500 ml-1 text-xs font-normal">[link]</a>}
                </p>
                {proj.description && <p className="text-gray-600 text-xs mt-0.5">{proj.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Minimal template
  return (
    <div ref={ref} id="resume-preview"
      className="bg-white text-gray-900 w-full shadow-lg text-sm"
      style={{ minHeight: '1122px', padding: '40px', fontFamily: 'Inter, sans-serif' }}>
      <h1 className="text-2xl font-light text-gray-800 mb-1">{personal.name || 'Your Name'}</h1>
      <div className="flex flex-wrap gap-3 text-gray-400 text-xs mb-4">
        {personal.email && <span>{personal.email}</span>}
        {personal.phone && <span>{personal.phone}</span>}
        {personal.location && <span>{personal.location}</span>}
        {personal.linkedin && (
          <a href={personal.linkedin} target="_blank" rel="noreferrer" className="text-gray-500 hover:underline">
            {personal.linkedin.replace('https://www.', '').replace('https://', '')}
          </a>
        )}
      </div>
      {personal.summary && <p className="text-gray-500 text-xs mb-5 leading-relaxed">{personal.summary}</p>}

      {filledExp.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Experience</h2>
          {filledExp.map((exp, i) => (
            <div key={i} className="mb-3">
              <p className="font-medium">{exp.role} <span className="text-gray-400 font-normal">at {exp.company}</span></p>
              <p className="text-gray-400 text-xs">{exp.duration}</p>
              {exp.description && <p className="text-gray-500 text-xs mt-1">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {filledEdu.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Education</h2>
          {filledEdu.map((edu, i) => (
            <div key={i} className="mb-2">
              <p className="font-medium">{edu.school}</p>
              <p className="text-gray-400 text-xs">{[edu.degree, edu.field].filter(Boolean).join(' in ')}{edu.year && ` · ${edu.year}`}</p>
            </div>
          ))}
        </div>
      )}

      {filledSkills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Skills</h2>
          <p className="text-gray-600 text-xs">{filledSkills.join(', ')}</p>
        </div>
      )}

      {filledProj.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Projects</h2>
          {filledProj.map((proj, i) => (
            <div key={i} className="mb-2">
              <p className="font-medium">
                {proj.name}
                {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-gray-400 ml-1 text-xs font-normal">[link]</a>}
              </p>
              {proj.description && <p className="text-gray-500 text-xs mt-0.5">{proj.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

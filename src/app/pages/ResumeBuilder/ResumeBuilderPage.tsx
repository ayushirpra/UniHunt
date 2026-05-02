import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Save, Download, Loader2, Check, ArrowLeft, FileText, ChevronDown } from 'lucide-react';
import { ResumeForm } from './ResumeForm';
import { ResumePreview } from './ResumePreview';
import { saveResume, getResumeById } from '../../../lib/resumeService';
import { emptyResumeData } from '../../../types/resume';
import type { ResumeData, ResumeTemplate } from '../../../types/resume';
const templates: { id: ResumeTemplate; label: string; desc: string }[] = [
  { id: 'modern', label: 'Modern', desc: 'Clean with indigo accents' },
  { id: 'classic', label: 'Classic', desc: 'Traditional serif style' },
  { id: 'minimal', label: 'Minimal', desc: 'Simple and elegant' },
];

export function ResumeBuilderPage() {
  const [data, setData] = useState<ResumeData>(emptyResumeData);
  const [template, setTemplate] = useState<ResumeTemplate>('modern');
  const [title, setTitle] = useState('My Resume');
  const [resumeId, setResumeId] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const id = searchParams.get('id');
    if (!id) return;
    setLoading(true);
    getResumeById(id).then(resume => {
      if (resume) {
        setResumeId(resume.id);
        setTitle(resume.title);
        setTemplate(resume.template);
        setData(resume.data);
      }
      setLoading(false);
    });
  }, [searchParams]);

  const handleSave = async () => {
    setSaving(true);
    const result = await saveResume({ id: resumeId, title, template, data });
    if (result?.id && !resumeId) setResumeId(result.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };


  const handleExportPDF = async () => {
    setExporting(true);
    setExportMenuOpen(false);
    try {
      const jsPDF = (await import('jspdf')).default;
      const { personal, education, experience, skills, projects } = data;

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth();   // 595pt
      const pageH = pdf.internal.pageSize.getHeight();  // 842pt
      const margin = 48;
      const contentW = pageW - margin * 2;
      let y = margin;

      const checkPage = (needed = 20) => {
        if (y + needed > pageH - margin) { pdf.addPage(); y = margin; }
      };

      const drawLine = (color = '#4F46E5') => {
        pdf.setDrawColor(color);
        pdf.setLineWidth(1);
        pdf.line(margin, y, pageW - margin, y);
        y += 8;
      };

      const sectionTitle = (text: string) => {
        checkPage(30);
        y += 10;
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(9);
        pdf.setTextColor('#4F46E5');
        pdf.text(text.toUpperCase(), margin, y);
        y += 4;
        drawLine('#4F46E5');
        pdf.setTextColor('#111111');
      };

      const wrappedText = (text: string, x: number, fontSize: number, color = '#333333', maxW = contentW) => {
        pdf.setFontSize(fontSize);
        pdf.setTextColor(color);
        const lines = pdf.splitTextToSize(text, maxW);
        lines.forEach((line: string) => {
          checkPage(fontSize + 4);
          pdf.text(line, x, y);
          y += fontSize + 3;
        });
      };

      // ── Name ──
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(22);
      pdf.setTextColor('#111111');
      pdf.text(personal.name || 'Your Name', margin, y);
      y += 26;

      // ── Contact line ──
      const contactParts = [
        personal.email,
        personal.phone,
        personal.location,
        personal.linkedin,
      ].filter(Boolean);
      if (contactParts.length > 0) {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9);
        pdf.setTextColor('#555555');
        const contactLine = contactParts.join('  |  ');
        const lines = pdf.splitTextToSize(contactLine, contentW);
        lines.forEach((line: string) => { pdf.text(line, margin, y); y += 13; });
      }

      drawLine('#4F46E5');

      // ── Summary ──
      if (personal.summary) {
        checkPage(20);
        pdf.setFont('helvetica', 'normal');
        wrappedText(personal.summary, margin, 9, '#444444');
        y += 4;
      }

      // ── Experience ──
      const filledExp = experience.filter(e => e.company);
      if (filledExp.length > 0) {
        sectionTitle('Work Experience');
        filledExp.forEach(exp => {
          checkPage(40);
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(10);
          pdf.setTextColor('#111111');
          pdf.text(exp.role, margin, y);
          if (exp.duration) {
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(9);
            pdf.setTextColor('#888888');
            pdf.text(exp.duration, pageW - margin, y, { align: 'right' });
          }
          y += 14;
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(9);
          pdf.setTextColor('#555555');
          pdf.text(exp.company, margin, y);
          y += 13;
          if (exp.description) wrappedText(exp.description, margin, 9, '#444444');
          y += 6;
        });
      }

      // ── Education ──
      const filledEdu = education.filter(e => e.school);
      if (filledEdu.length > 0) {
        sectionTitle('Education');
        filledEdu.forEach(edu => {
          checkPage(36);
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(10);
          pdf.setTextColor('#111111');
          pdf.text(edu.school, margin, y);
          if (edu.year) {
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(9);
            pdf.setTextColor('#888888');
            pdf.text(edu.year, pageW - margin, y, { align: 'right' });
          }
          y += 14;
          const degreeText = [edu.degree, edu.field].filter(Boolean).join(' in ');
          if (degreeText) {
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(9);
            pdf.setTextColor('#555555');
            pdf.text(degreeText, margin, y);
            y += 13;
          }
          y += 4;
        });
      }

      // ── Skills ──
      const filledSkills = skills.filter(Boolean);
      if (filledSkills.length > 0) {
        sectionTitle('Skills');
        wrappedText(filledSkills.join('  ·  '), margin, 9, '#333333');
        y += 4;
      }

      // ── Projects ──
      const filledProj = projects.filter(p => p.name);
      if (filledProj.length > 0) {
        sectionTitle('Projects');
        filledProj.forEach(proj => {
          checkPage(30);
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(10);
          pdf.setTextColor('#111111');
          pdf.text(proj.name, margin, y);
          y += 14;
          if (proj.description) wrappedText(proj.description, margin, 9, '#444444');
          if (proj.link) {
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(8);
            pdf.setTextColor('#4F46E5');
            pdf.text(proj.link, margin, y);
            y += 12;
          }
          y += 4;
        });
      }

      pdf.save(`${title.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('PDF export failed. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const handleExportDOCX = async () => {
    setExporting(true);
    setExportMenuOpen(false);
    try {
      const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, ExternalHyperlink, BorderStyle } = await import('docx');
      const { saveAs } = await import('file-saver');
      const { personal, education, experience, skills, projects } = data;

      const sectionGap = () => new Paragraph({ text: '' });
      const sectionHeading = (text: string) => new Paragraph({
        text,
        heading: HeadingLevel.HEADING_2,
        border: { bottom: { color: '4F46E5', size: 6, space: 4, style: BorderStyle.SINGLE } },
        spacing: { after: 120 },
      });

      const contactParts: TextRun[] = [
        personal.email ? new TextRun({ text: personal.email, size: 18, color: '555555' }) : null,
        personal.phone ? new TextRun({ text: `  |  ${personal.phone}`, size: 18, color: '555555' }) : null,
        personal.location ? new TextRun({ text: `  |  ${personal.location}`, size: 18, color: '555555' }) : null,
      ].filter(Boolean) as TextRun[];

      const children = [
        new Paragraph({
          children: [new TextRun({ text: personal.name || 'Your Name', bold: true, size: 48 })],
          alignment: AlignmentType.LEFT,
          spacing: { after: 80 },
        }),
        ...(contactParts.length > 0 ? [new Paragraph({ children: contactParts, spacing: { after: 60 } })] : []),
        ...(personal.linkedin ? [new Paragraph({
          children: [new ExternalHyperlink({
            link: personal.linkedin,
            children: [new TextRun({ text: personal.linkedin, style: 'Hyperlink', size: 18 })],
          })],
          spacing: { after: 80 },
        })] : []),
        ...(personal.summary ? [
          sectionGap(), sectionHeading('Summary'),
          new Paragraph({ text: personal.summary, spacing: { after: 80 } }),
        ] : []),
        ...(experience.some(e => e.company) ? [
          sectionGap(), sectionHeading('Work Experience'),
          ...experience.filter(e => e.company).flatMap(exp => [
            new Paragraph({
              children: [
                new TextRun({ text: exp.role, bold: true }),
                new TextRun({ text: `  —  ${exp.company}`, color: '555555' }),
              ],
              spacing: { after: 40 },
            }),
            ...(exp.duration ? [new Paragraph({ children: [new TextRun({ text: exp.duration, color: '888888', size: 18 })], spacing: { after: 40 } })] : []),
            ...(exp.description ? [new Paragraph({ text: exp.description, spacing: { after: 120 } })] : []),
          ]),
        ] : []),
        ...(education.some(e => e.school) ? [
          sectionGap(), sectionHeading('Education'),
          ...education.filter(e => e.school).flatMap(edu => [
            new Paragraph({ children: [new TextRun({ text: edu.school, bold: true })], spacing: { after: 40 } }),
            ...([edu.degree, edu.field].filter(Boolean).length > 0 ? [new Paragraph({
              children: [new TextRun({ text: [edu.degree, edu.field].filter(Boolean).join(' in '), color: '555555' })],
              spacing: { after: 40 },
            })] : []),
            ...(edu.year ? [new Paragraph({ children: [new TextRun({ text: edu.year, color: '888888', size: 18 })], spacing: { after: 120 } })] : []),
          ]),
        ] : []),
        ...(skills.filter(Boolean).length > 0 ? [
          sectionGap(), sectionHeading('Skills'),
          new Paragraph({ text: skills.filter(Boolean).join('  ·  '), spacing: { after: 80 } }),
        ] : []),
        ...(projects.some(p => p.name) ? [
          sectionGap(), sectionHeading('Projects'),
          ...projects.filter(p => p.name).flatMap(proj => [
            new Paragraph({
              children: [
                new TextRun({ text: proj.name, bold: true }),
                ...(proj.link ? [
                  new TextRun({ text: '  ' }),
                  new ExternalHyperlink({
                    link: proj.link,
                    children: [new TextRun({ text: '[link]', style: 'Hyperlink', size: 18 })],
                  }),
                ] : []),
              ],
              spacing: { after: 40 },
            }),
            ...(proj.description ? [new Paragraph({ text: proj.description, spacing: { after: 120 } })] : []),
          ]),
        ] : []),
      ];

      const doc = new Document({
        styles: { paragraphStyles: [{ id: 'Normal', name: 'Normal', run: { size: 22, font: 'Calibri' } }] },
        sections: [{ properties: {}, children }],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${title.replace(/\s+/g, '_')}.docx`);
    } catch (err) {
      console.error('DOCX export failed:', err);
      alert('Word export failed. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Top Bar */}
      <div className="sticky top-16 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate('/my-resumes')}
            className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> My Resumes
          </button>

          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="flex-1 max-w-xs px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Resume title..."
          />

          <div className="hidden md:flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {templates.map(t => (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id)}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  template === t.id
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm font-medium'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto">

            <div className="relative">
              <button
                onClick={() => setExportMenuOpen(o => !o)}
                disabled={exporting}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm disabled:opacity-50">
                {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                Export
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {exportMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setExportMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
                    <button
                      onClick={handleExportPDF}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <FileText className="w-4 h-4 text-red-500" />
                      Export as PDF
                    </button>
                    <button
                      onClick={handleExportDOCX}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <FileText className="w-4 h-4 text-blue-500" />
                      Export as Word
                    </button>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm disabled:opacity-70">
              {saved ? (
                <><Check className="w-4 h-4" /> Saved!</>
              ) : saving ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
              ) : (
                <><Save className="w-4 h-4" /> Save</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex gap-0 h-[calc(100vh-8rem)]">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 overflow-y-auto p-6 border-r border-gray-200 dark:border-gray-700">
          <div className="flex md:hidden items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-4">
            {templates.map(t => (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id)}
                className={`flex-1 py-1 text-xs rounded-md transition-colors ${
                  template === t.id
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm font-medium'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                {t.label}
              </button>
            ))}
          </div>
          <ResumeForm data={data} onChange={setData} />
        </div>

        {/* Right: Live Preview */}
        <div className="hidden md:flex w-1/2 overflow-y-auto bg-gray-100 dark:bg-gray-950 p-6 flex-col">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Live Preview</span>
            <span className="ml-auto text-xs text-gray-400 dark:text-gray-500 italic">{templates.find(t => t.id === template)?.desc}</span>
          </div>
          <ResumePreview data={data} template={template} />
        </div>
      </div>
    </div>
  );
}

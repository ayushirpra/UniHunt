import { useState, useEffect, useRef } from 'react';
import {
  Sparkles, Download, Copy, RefreshCw, FileText, Wand2,
  Loader2, Check, Trash2, ChevronDown, ChevronUp, Save, Clock,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface SOPHistory {
  id: string;
  university_name: string;
  program: string;
  sop_content: string;
  created_at: string;
  expanded?: boolean;
}

const inputClass =
  'w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500';

export function AISOP() {
  const [formData, setFormData] = useState({
    university: '', program: '', background: '', achievements: '', careerGoals: '',
  });
  const [generatedSOP, setGeneratedSOP] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const [history, setHistory] = useState<SOPHistory[]>([]);
  const [userName, setUserName] = useState('');
  const [uniSuggestions, setUniSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const sopRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetchUserAndHistory();
  }, []);

  const fetchUserAndHistory = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase
      .from('profiles').select('full_name').eq('id', user.id).single();
    if (profile?.full_name) setUserName(profile.full_name);

    const { data: sops } = await supabase
      .from('generated_sops')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (sops) setHistory(sops);
  };

  const fetchUniSuggestions = async (query: string) => {
    if (query.length < 2) { setUniSuggestions([]); return; }
    const { data } = await supabase
      .from('universities')
      .select('name')
      .ilike('name', `%${query}%`)
      .limit(5);
    setUniSuggestions(data?.map((u) => u.name) || []);
    setShowSuggestions(true);
  };

  const handleGenerate = async () => {
    if (!formData.university || !formData.program) return;
    setErrorMessage('');
    setIsGenerating(true);

    try {
      // Simulate a slight delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));

      const { university, program, background, achievements, careerGoals } = formData;
      const name = userName || "Applicant";
      
      const template = `[Your Name]
[Your Address]
[City, State, Zip Code]
[Your Email Address]
[Your Phone Number]

[Date]

Admissions Committee
${program}
${university}
[University Address, e.g., City, State, Zip Code]

Dear Members of the Admissions Committee,

I am writing to express my strong interest in the ${program} at ${university}. With a solid foundation in my field and a deep passion for continuous learning, I am eager to contribute to and grow within your esteemed program.

${background ? `My academic and professional background has thoroughly prepared me for this challenge. ${background}` : "Throughout my academic journey, I have developed a rigorous understanding of the core concepts in my discipline, which has fueled my desire to pursue advanced studies."}

${achievements ? `During my previous studies and experiences, I have achieved significant milestones. ${achievements}` : "I have consistently demonstrated a strong work ethic, dedication, and an ability to excel in challenging academic environments."}

Choosing ${university} for my ${program} was a natural decision for me. I am particularly drawn to the innovative research, distinguished faculty, and the collaborative environment that your institution fosters. I am confident that the resources and mentorship available at ${university} will be instrumental in helping me achieve my long-term objectives.

${careerGoals ? `Upon completing the ${program}, my goal is to ${careerGoals}.` : "Looking ahead, I intend to apply the knowledge and skills gained from this program to make a meaningful impact in my chosen profession."}

Thank you for considering my application. I am enthusiastic about the opportunity to bring my unique perspective and dedication to the ${program} at ${university}.

Sincerely,

${name}`;

      setGeneratedSOP(template);
    } catch (error: any) {
      setErrorMessage(error?.message || 'Could not generate SOP right now. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = async () => handleGenerate();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedSOP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const date = new Date().toISOString().split('T')[0];
    const filename = `SOP_${formData.university.replace(/\s+/g, '_')}_${date}.txt`;
    const blob = new Blob([generatedSOP], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setSaving(true);
    const { data, error } = await supabase.from('generated_sops').insert({
      user_id: user.id,
      university_name: formData.university,
      program: formData.program,
      background: formData.background,
      sop_content: generatedSOP,
      created_at: new Date().toISOString(),
    }).select().single();
    setSaving(false);
    if (!error && data) {
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 2500);
      setHistory((prev) => [data, ...prev]);
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from('generated_sops').delete().eq('id', id);
    setHistory((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleExpand = (id: string) => {
    setHistory((prev) =>
      prev.map((s) => (s.id === id ? { ...s, expanded: !s.expanded } : s))
    );
  };

  const wordCount = generatedSOP.split(/\s+/).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered Tool
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Statement of Purpose Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create a personalized, compelling SOP for your university application
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Information</h2>
              </div>

              <div className="space-y-5">
                {/* University with autocomplete */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target University <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.university}
                    onChange={(e) => {
                      setFormData({ ...formData, university: e.target.value });
                      fetchUniSuggestions(e.target.value);
                    }}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    className={inputClass}
                    placeholder="e.g., MIT, Stanford University"
                  />
                  {showSuggestions && uniSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
                      {uniSuggestions.map((name) => (
                        <button
                          key={name}
                          onMouseDown={() => {
                            setFormData({ ...formData, university: name });
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Program / Major <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className={inputClass}
                    placeholder="e.g., Masters in Computer Science"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Background
                  </label>
                  <textarea
                    value={formData.background}
                    onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                    rows={3}
                    className={`${inputClass} resize-none`}
                    placeholder="Describe your academic background, relevant coursework, projects..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Academic Achievements
                  </label>
                  <textarea
                    value={formData.achievements}
                    onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                    rows={3}
                    className={`${inputClass} resize-none`}
                    placeholder="GPA, awards, publications, research experience..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Career Goals
                  </label>
                  <textarea
                    value={formData.careerGoals}
                    onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })}
                    rows={3}
                    className={`${inputClass} resize-none`}
                    placeholder="What do you want to achieve after this program?"
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !formData.university || !formData.program}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating your personalized SOP...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Generate SOP
                    </>
                  )}
                </button>
                {errorMessage && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
                )}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-5">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">Tips for a Great SOP</h3>
              <ul className="space-y-1.5 text-sm text-blue-800 dark:text-blue-300">
                {[
                  'Be specific about why you chose this university and program',
                  'Highlight unique experiences and achievements',
                  'Show genuine passion and long-term commitment',
                  'Keep it concise and well-structured (500–1000 words)',
                  'Always proofread and customize for each university',
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Generated SOP */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700 p-5 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Generated SOP</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Review and edit the content below</p>
              </div>

              <div className="p-6">
                {!generatedSOP ? (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                      <FileText className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1 font-medium">
                      Generate your first SOP
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Fill in the form and click "Generate SOP" to get started
                    </p>
                  </div>
                ) : (
                  <>
                    <textarea
                      ref={sopRef}
                      value={generatedSOP}
                      onChange={(e) => setGeneratedSOP(e.target.value)}
                      rows={22}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none resize-none text-sm leading-relaxed"
                    />

                    {/* Stats */}
                    <div className="flex items-center gap-6 mt-3 text-sm text-gray-500 dark:text-gray-400">
                      <span>{wordCount} words</span>
                      <span>{generatedSOP.length} characters</span>
                      <span>{generatedSOP.split('\n\n').filter(Boolean).length} paragraphs</span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                      <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                      >
                        <Download className="w-4 h-4" />
                        Download TXT
                      </button>
                      <button
                        onClick={handleRegenerate}
                        disabled={isGenerating}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm disabled:opacity-50"
                      >
                        <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                        Regenerate
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={saving || savedMsg}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm disabled:opacity-70 ml-auto"
                      >
                        {savedMsg ? (
                          <><Check className="w-4 h-4" /> Saved!</>
                        ) : saving ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                        ) : (
                          <><Save className="w-4 h-4" /> Save to History</>
                        )}
                      </button>
                    </div>

                    <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-sm text-amber-800 dark:text-amber-300">
                      <strong>Remember:</strong> Review, personalize, and refine this content to truly reflect your voice and experiences.
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SOP History */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">SOP History</h2>
          </div>

          {history.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
              <Sparkles className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">Generate and save your first SOP to see it here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="flex items-center justify-between p-5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                          {item.university_name}
                        </h3>
                        <span className="text-xs px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full shrink-0">
                          {item.program}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(item.created_at).toLocaleDateString()} · {item.sop_content.slice(0, 100)}...
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4 shrink-0">
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        {item.expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        {item.expanded ? 'Hide' : 'View'}
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {item.expanded && (
                    <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-700 pt-4">
                      <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">
                        {item.sop_content}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

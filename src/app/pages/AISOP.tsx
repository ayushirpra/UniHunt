import { useState } from 'react';
import { Sparkles, Download, Copy, RefreshCw, FileText, Wand2 } from 'lucide-react';

export function AISOP() {
  const [university, setUniversity] = useState('');
  const [program, setProgram] = useState('');
  const [background, setBackground] = useState('');
  const [motivation, setMotivation] = useState('');
  const [careerGoals, setCareerGoals] = useState('');
  const [generatedSOP, setGeneratedSOP] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedSOP(`Dear Admissions Committee,

I am writing to express my strong interest in pursuing a Master's degree in ${program || 'Computer Science'} at ${university || 'your esteemed university'}. With a solid academic foundation and a passion for technology, I am eager to contribute to and learn from your distinguished program.

${background || 'My academic journey has been marked by consistent excellence and a deep curiosity for understanding complex systems. Throughout my undergraduate studies, I have maintained a strong GPA while actively engaging in research projects and practical applications of theoretical concepts.'}

${motivation || 'What draws me to this program is its innovative curriculum and world-class faculty who are at the forefront of research in artificial intelligence and machine learning. The opportunity to work alongside leading researchers and collaborate with talented peers from diverse backgrounds is particularly exciting to me.'}

${careerGoals || 'Upon completion of this program, I aim to leverage my enhanced skills and knowledge to contribute meaningfully to the field of technology. My long-term goal is to work on developing solutions that address real-world challenges and make a positive impact on society.'}

I am confident that my academic background, research experience, and genuine passion for the field make me a strong candidate for your program. I look forward to the opportunity to contribute to your academic community and grow both personally and professionally.

Thank you for considering my application.

Sincerely,
[Your Name]`);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedSOP);
    alert('SOP copied to clipboard!');
  };

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
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    University Name
                  </label>
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    placeholder="University name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Program Name
                  </label>
                  <input
                    type="text"
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    placeholder="Program name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Academic Background
                    <span className="text-gray-500 dark:text-gray-400 font-normal ml-1">(Optional)</span>
                  </label>
                  <textarea
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    placeholder="Describe your educational background, GPA, relevant coursework, projects..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Why This University?
                    <span className="text-gray-500 dark:text-gray-400 font-normal ml-1">(Optional)</span>
                  </label>
                  <textarea
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    placeholder="What attracts you to this specific program? Research interests, faculty, facilities..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Career Goals
                    <span className="text-gray-500 dark:text-gray-400 font-normal ml-1">(Optional)</span>
                  </label>
                  <textarea
                    value={careerGoals}
                    onChange={(e) => setCareerGoals(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    placeholder="What are your short-term and long-term career aspirations?"
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !university || !program}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Generate SOP
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">Tips for a Great SOP</h3>
              <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>Be specific about why you chose this university and program</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>Highlight unique experiences and achievements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>Show genuine passion and long-term commitment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>Keep it concise and well-structured (500-1000 words)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>Always proofread and customize for each university</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Generated SOP */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Generated SOP</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Review and customize the generated content below
                </p>
              </div>

              <div className="p-6">
                {!generatedSOP ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                      <FileText className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">No SOP generated yet</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Fill in the form and click "Generate SOP" to create your statement
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="prose max-w-none">
                      <textarea
                        value={generatedSOP}
                        onChange={(e) => setGeneratedSOP(e.target.value)}
                        rows={24}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none resize-none text-sm leading-relaxed"
                      />
                    </div>

                    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                        Copy
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                      <button
                        onClick={handleGenerate}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ml-auto"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Regenerate
                      </button>
                    </div>

                    <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                      <p className="text-sm text-amber-800 dark:text-amber-300">
                        <strong>Remember:</strong> This is a starting point. Please review,
                        personalize, and refine the content to truly reflect your voice and
                        experiences.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Word Count */}
            {generatedSOP && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Word Count</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {generatedSOP.split(/\s+/).filter(Boolean).length}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Character Count</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{generatedSOP.length}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Paragraphs</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {generatedSOP.split('\n\n').filter(Boolean).length}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

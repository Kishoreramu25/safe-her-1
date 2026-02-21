import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const ComplaintStep2: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [incidentDesc, setIncidentDesc] = React.useState('');
    const [suspectInfo, setSuspectInfo] = React.useState({ name: '', handle: '' });
    const [victimDetails, setVictimDetails] = React.useState({ alias: '', gender: '', age: '', relation: 'Self' });
    const [platformLinks, setPlatformLinks] = React.useState<Record<string, string>>({});
    const [selectedPlatforms, setSelectedPlatforms] = React.useState<string[]>([]);

    React.useEffect(() => {
        const step1Data = JSON.parse(sessionStorage.getItem('report_step_1') || '{}');
        const platforms = step1Data.platforms || [];
        setSelectedPlatforms(platforms);

        // Initialize links object
        const initialLinks: Record<string, string> = {};
        platforms.forEach((p: string) => {
            initialLinks[p] = '';
        });
        setPlatformLinks(initialLinks);
    }, []);

    const handleContinue = () => {
        // Save Step 2 data
        const step2Data = {
            incident_description: incidentDesc,
            suspect_info: suspectInfo,
            victim_details: victimDetails,
            platform_links: platformLinks
        };
        sessionStorage.setItem('report_step_2', JSON.stringify(step2Data));
        navigate('/report/processing');
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
            {/* Header Section */}
            <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-4">
                <div className="flex items-center justify-between max-w-md mx-auto">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">arrow_back_ios</span>
                    </button>
                    <h1 className="text-lg font-bold tracking-tight">{t.complaintRegistration}</h1>
                    <div className="w-10"></div> {/* Spacer for symmetry */}
                </div>
                {/* Progress Stepper */}
                <div className="max-w-md mx-auto mt-6 flex items-center justify-center gap-3">
                    <div className="h-1.5 w-12 rounded-full bg-primary"></div>
                    <div className="h-1.5 w-12 rounded-full bg-primary"></div>
                    <div className="h-1.5 w-12 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                    <div className="h-1.5 w-12 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                </div>
                <p className="text-center text-xs font-semibold uppercase tracking-widest mt-3 text-primary">{t.step2of4}</p>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto px-4 py-6 max-w-md mx-auto w-full no-scrollbar pb-32">
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">{t.incidentParties}</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{t.incidentPartiesDesc}</p>
                </section>

                <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
                    {/* Section 1: Incident Description */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-primary text-xl">description</span>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">{t.incidentDetails}</h3>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium" htmlFor="incident-desc">{t.shortIncidentDesc} <span className="text-red-500">*</span></label>
                            <textarea
                                className="w-full bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm placeholder:text-slate-400 p-3"
                                id="incident-desc"
                                placeholder={t.briefDescPlaceholder}
                                rows={4}
                                required
                                value={incidentDesc}
                                onChange={(e) => setIncidentDesc(e.target.value)}
                            ></textarea>
                            <div className="flex justify-between items-center px-1">
                                <span className="text-[11px] text-red-500 font-medium">{t.thisFieldRequired}</span>
                                <span className="text-[11px] text-slate-500">0 / 500 characters</span>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Platform Links */}
                    {selectedPlatforms.length > 0 && (
                        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="material-symbols-outlined text-primary text-xl">link</span>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">{t.incidentLinks}</h3>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{t.incidentLinksDesc}</p>
                            <div className="space-y-4">
                                {selectedPlatforms.map((platform) => (
                                    <div key={platform} className="space-y-1.5">
                                        <label className="text-xs font-semibold capitalize text-slate-500 dark:text-slate-400 ml-1">
                                            {platform} Profile/Post Link <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="url"
                                            required
                                            className="w-full bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary text-sm h-11 px-3"
                                            placeholder={`https://www.${platform}.com/...`}
                                            value={platformLinks[platform] || ''}
                                            onChange={(e) => setPlatformLinks({ ...platformLinks, [platform]: e.target.value })}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Section 3: Suspected Accused */}
                    <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-xl">person_search</span>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">{t.suspectedAccused}</h3>
                            </div>
                            <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full font-bold uppercase">{t.optional}</span>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-1">{t.suspectNameAlias}</label>
                                <input
                                    type="text"
                                    className="w-full bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary text-sm h-11 px-3"
                                    placeholder={t.suspectNamePlaceholder}
                                    value={suspectInfo.name}
                                    onChange={(e) => setSuspectInfo({ ...suspectInfo, name: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Victim Details */}
                    <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-xl">person</span>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">{t.victimDetails}</h3>
                        </div>
                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-1">{t.victimAliasLabel}</label>
                                <input
                                    type="text"
                                    className="w-full bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary text-sm h-11 px-3 placeholder:text-slate-400"
                                    placeholder={t.victimAliasPlaceholder}
                                    value={victimDetails.alias}
                                    onChange={(e) => setVictimDetails({ ...victimDetails, alias: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-1">{t.gender} <span className="text-red-500">*</span></label>
                                    <select
                                        className="w-full bg-white dark:bg-surface-dark border-slate-200 dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary text-sm h-11 px-2"
                                        value={victimDetails.gender}
                                        onChange={(e) => setVictimDetails({ ...victimDetails, gender: e.target.value })}
                                    >
                                        <option value="">{t.selectGender}</option>
                                        <option value="Male">{t.male}</option>
                                        <option value="Female">{t.female}</option>
                                        <option value="Other">{t.other}</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-1">{t.ageGroup}</label>
                                    <select
                                        className="w-full bg-white dark:bg-surface-dark border-slate-200 dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary text-sm h-11 px-2"
                                        value={victimDetails.age}
                                        onChange={(e) => setVictimDetails({ ...victimDetails, age: e.target.value })}
                                    >
                                        <option value="">Select</option>
                                        <option value="Under 18">Under 18</option>
                                        <option value="18-24">18-24</option>
                                        <option value="25-44">25-44</option>
                                        <option value="45+">45+</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-1">{t.relationToReporter} <span className="text-red-500">*</span></label>
                                <select
                                    className="w-full bg-white dark:bg-surface-dark border-slate-200 dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary text-sm h-11 px-2"
                                    value={victimDetails.relation}
                                    onChange={(e) => setVictimDetails({ ...victimDetails, relation: e.target.value })}
                                >
                                    <option value="Self">{t.self}</option>
                                    <option value="Family Member">{t.familyMember}</option>
                                    <option value="Friend">{t.friend}</option>
                                    <option value="Legal Representative">{t.legalRep}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </main>

            {/* Bottom Navigation Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 p-4 pb-8 safe-area-bottom">
                <div className="max-w-md mx-auto flex gap-4">
                    <button onClick={() => navigate(-1)} className="flex-1 h-12 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                        {t.previous}
                    </button>
                    <button onClick={handleContinue} className="flex-[2] h-12 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-all">
                        {t.continueToStep3}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ComplaintStep2;

export type Language = 'en' | 'ta' | 'hi';

export interface Translations {
    // Common
    appName: string;
    tagline: string;
    getStarted: string;
    helpCenter: string;
    language: string;
    back: string;
    continueBtn: string;
    submitBtn: string;
    previous: string;
    optional: string;
    required: string;
    loading: string;
    signOut: string;
    signOutDesc: string;

    // Role Selection
    whoAreYou: string;
    selectProfile: string;
    publicUser: string;
    publicDesc: string;
    cyberOfficial: string;
    cyberDesc: string;
    appLanguage: string;

    // Auth
    welcomeBack: string;
    secureAccess: string;
    loginToPublic: string;
    loginToOfficial: string;
    fullName: string;
    emailAddress: string;
    password: string;
    minChars: string;
    logIn: string;
    noAccount: string;
    createAccount: string;
    haveAccount: string;
    orSecureWith: string;
    termsText: string;
    enterLegalName: string;

    // Landing
    createYourCase: string;
    landingSubtitle: string;
    requestDeletion: string;
    trackStatus: string;
    privacyFirst: string;
    privacyDesc: string;
    rapidResponse: string;
    rapidDesc: string;
    legalAdvisory: string;
    legalDesc: string;
    whoCanUse: string;
    whoCanUseDesc: string;
    eligibility1: string;
    eligibility2: string;
    eligibility3: string;
    eligibility4: string;

    // Navigation
    roleSelection: string;
    startCase: string;
    monitorCases: string;
    myReports: string;
    functions: string;
    askAI: string;
    settings: string;
    requestDeletionNav: string;

    // Settings
    settingsTitle: string;
    darkMode: string;
    darkModeDesc: string;
    appearanceTheme: string;
    languageSetting: string;
    languageSettingDesc: string;
    sosConfig: string;
    voiceTrigger: string;
    emergencyContact: string;
    saveSettings: string;

    // Dashboard / Reports
    dashboard: string;
    totalCases: string;
    pendingCases: string;
    resolvedCases: string;
    recentCases: string;
    myFiledReports: string;
    caseId: string;
    trackProgress: string;
    noReportsFound: string;
    noReportsDesc: string;
    fileAReport: string;
    loadingHistory: string;

    // ComplaintStep1
    reportAnIncident: string;
    step1of4: string;
    step2of4: string;
    complete25: string;
    wherePlatform: string;
    selectAllPlatforms: string;
    otherPlatform: string;
    incidentCategory: string;
    whatTypeCrime: string;
    selectCategory: string;
    financialFraud: string;
    cyberBullying: string;
    identityTheft: string;
    hacking: string;
    childSafety: string;
    misleadingContent: string;
    uploadEvidence: string;
    attachFiles: string;
    tapToUpload: string;
    fileTypes: string;
    noEvidence: string;
    uploadingEvidence: string;
    continueToDetails: string;

    // ComplaintStep2
    complaintRegistration: string;
    incidentParties: string;
    incidentPartiesDesc: string;
    incidentDetails: string;
    shortIncidentDesc: string;
    briefDescPlaceholder: string;
    thisFieldRequired: string;
    incidentLinks: string;
    incidentLinksDesc: string;
    suspectedAccused: string;
    suspectNameAlias: string;
    suspectNamePlaceholder: string;
    victimDetails: string;
    victimAliasLabel: string;
    victimAliasPlaceholder: string;
    gender: string;
    selectGender: string;
    male: string;
    female: string;
    other: string;
    ageGroup: string;
    relationToReporter: string;
    self: string;
    familyMember: string;
    friend: string;
    legalRep: string;
    continueToStep3: string;

    // Processing
    liveAnalysis: string;
    deepAnalysisProgress: string;
    deepAnalysisDesc: string;
    ocrExtraction: string;
    ocrDesc: string;
    threatMapping: string;
    threatDesc: string;
    aiAudit: string;
    aiAuditDesc: string;

    // My Reports
    footerText: string;
    footerSubtext: string;
}

const en: Translations = {
    appName: 'SafeHer India',
    tagline: 'From Fear to Freedom — Protecting Every Mother. Empowering Every Girl.',
    getStarted: 'Get Started',
    helpCenter: 'Help Center',
    language: 'English',
    back: 'Back',
    continueBtn: 'Continue',
    submitBtn: 'Submit',
    previous: 'Previous',
    optional: 'Optional',
    required: 'Required',
    loading: 'Loading...',
    signOut: 'Sign Out',
    signOutDesc: 'You will be redirected to the home page.',

    whoAreYou: 'Who are you?',
    selectProfile: 'Select your profile to continue to the dashboard.',
    publicUser: 'Public User',
    publicDesc: 'Report crimes & access resources',
    cyberOfficial: 'Cyber Official',
    cyberDesc: 'Investigate reports & manage cases',
    appLanguage: 'App Language: Your Mothertongue',

    welcomeBack: 'Welcome Back',
    secureAccess: 'Secure Access',
    loginToPublic: 'Log in to your public account.',
    loginToOfficial: 'Log in to your official account.',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    password: 'Password',
    minChars: 'Min. 8 characters',
    logIn: 'Log In',
    noAccount: "Don't have an account?",
    createAccount: 'Create Account',
    haveAccount: 'Already have an account?',
    orSecureWith: 'Or Secure with',
    termsText: 'By signing up, you agree to our Terms of Service and Privacy Policy.',
    enterLegalName: 'Enter your legal name',

    createYourCase: 'Create Your Case',
    landingSubtitle: 'Take control and protect your privacy today. Our AI-powered system helps you identify and request removal of unauthorized content.',
    requestDeletion: 'Request Deletion',
    trackStatus: 'Track Status',
    privacyFirst: 'Privacy First',
    privacyDesc: 'Your data and evidence are encrypted with bank-grade security before investigation.',
    rapidResponse: 'Rapid Response',
    rapidDesc: 'Automated takedown requests sent within minutes of case verification.',
    legalAdvisory: 'Legal Advisory',
    legalDesc: 'Access automated legal mapping aligned with Indian IT Acts and Cyber Laws.',
    whoCanUse: 'Who can use SafeHer?',
    whoCanUseDesc: 'SafeHer India is a free tool designed to support victims of cyber harassment and unauthorized image sharing.',
    eligibility1: 'Victims of Non-Consensual Intimate Image abuse',
    eligibility2: 'Individuals facing online harassment',
    eligibility3: 'Citizens identifying deepfake manipulation',
    eligibility4: 'Minor girls and women seeking safety',

    roleSelection: 'Role Selection',
    startCase: 'Start Case',
    monitorCases: 'Monitor Cases',
    myReports: 'My Reports',
    functions: 'Functions',
    askAI: 'Ask AI',
    settings: 'Settings',
    requestDeletionNav: 'Request Deletion',

    settingsTitle: 'Settings',
    darkMode: 'Dark Mode',
    darkModeDesc: 'Switch between light and dark appearance.',
    appearanceTheme: 'Appearance Theme',
    languageSetting: 'App Language',
    languageSettingDesc: 'Choose the language for the entire application.',
    sosConfig: 'SOS Configuration',
    voiceTrigger: 'Voice Trigger Phrase',
    emergencyContact: 'Emergency Contact Email',
    saveSettings: 'Save Settings',

    dashboard: 'Dashboard',
    totalCases: 'Total Cases',
    pendingCases: 'Pending',
    resolvedCases: 'Resolved',
    recentCases: 'Recent Cases',
    myFiledReports: 'My Filed Reports',
    caseId: 'Case ID',
    trackProgress: 'Track Progress',
    noReportsFound: 'No Reports Found',
    noReportsDesc: "You haven't filed any cybercrime reports yet.",
    fileAReport: 'File a Report',
    loadingHistory: 'Loading History...',

    reportAnIncident: 'Report an Incident',
    step1of4: 'Step 1 of 4',
    step2of4: 'Step 2 of 4',
    complete25: '25% Complete',
    wherePlatform: 'Where did this happen?',
    selectAllPlatforms: 'Select all platforms where the incident occurred.',
    otherPlatform: 'Other Platform',
    incidentCategory: 'Incident Category',
    whatTypeCrime: 'What type of cyber crime are you reporting?',
    selectCategory: 'Select a category',
    financialFraud: 'Financial Fraud / Online Scam',
    cyberBullying: 'Cyber Bullying / Harassment',
    identityTheft: 'Identity Theft / Impersonation',
    hacking: 'Hacking / Unauthorized Access',
    childSafety: 'Child Safety Related',
    misleadingContent: 'Misleading Content / Fake News',
    uploadEvidence: 'Upload Evidence',
    attachFiles: 'Attach screenshots, chat logs, or documents.',
    tapToUpload: 'Tap to upload files',
    fileTypes: 'JPG, PNG, PDF, or MP4 (Max 20MB)',
    noEvidence: 'No evidence uploaded yet',
    uploadingEvidence: 'Uploading Evidence...',
    continueToDetails: 'Continue to Details',

    complaintRegistration: 'Complaint Registration',
    incidentParties: 'Incident & Parties',
    incidentPartiesDesc: 'Please provide accurate details about the event and the individuals involved.',
    incidentDetails: 'Incident Details',
    shortIncidentDesc: 'Short Incident Description',
    briefDescPlaceholder: 'Briefly describe what happened, when, and how...',
    thisFieldRequired: 'This field is required',
    incidentLinks: 'Incident Links',
    incidentLinksDesc: 'Please provide the URL to the profile or post for each platform.',
    suspectedAccused: 'Suspected Accused',
    suspectNameAlias: 'Suspect Name / Alias',
    suspectNamePlaceholder: 'e.g. Unknown or John Doe',
    victimDetails: 'Victim Details',
    victimAliasLabel: 'Victim Alias / ID (Anonymous)',
    victimAliasPlaceholder: 'e.g. Victim-X or Anonymous',
    gender: 'Gender',
    selectGender: 'Select',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    ageGroup: 'Age Group',
    relationToReporter: 'Relation to Reporter',
    self: 'Self',
    familyMember: 'Family Member',
    friend: 'Friend',
    legalRep: 'Legal Representative',
    continueToStep3: 'Continue to Step 3',

    liveAnalysis: 'Live Analysis',
    deepAnalysisProgress: 'Deep Analysis in Progress',
    deepAnalysisDesc: 'Our AI is currently auditing the submitted evidence for cyber threats and harassment patterns.',
    ocrExtraction: 'OCR Extraction',
    ocrDesc: 'Reading and extracting text from evidence files.',
    threatMapping: 'Threat Mapping',
    threatDesc: 'Cross-referencing identifiers with known threat databases.',
    aiAudit: 'AI Audit',
    aiAuditDesc: 'Classifying incident severity and legal applicability.',

    footerText: 'SafeHer India Official',
    footerSubtext: '© 2026 SafeHer. Government Compliant. Secure. Free.',
};

const ta: Translations = {
    appName: 'SafeHer India',
    tagline: 'பயத்தில் இருந்து சுதந்திரத்திற்கு — ஒவ்வொரு தாயையும் பாதுகாக்க. ஒவ்வொரு பெண்ணையும் வலுப்படுத்த.',
    getStarted: 'தொடங்குங்கள்',
    helpCenter: 'உதவி மையம்',
    language: 'தமிழ்',
    back: 'திரும்பு',
    continueBtn: 'தொடரவும்',
    submitBtn: 'சமர்பிக்கவும்',
    previous: 'முந்தையது',
    optional: 'விருப்பத்தேர்வு',
    required: 'கட்டாயம்',
    loading: 'ஏற்றுகிறது...',
    signOut: 'வெளியேறு',
    signOutDesc: 'நீங்கள் முகப்பு பக்கத்திற்கு திருப்பி விடப்படுவீர்கள்.',

    whoAreYou: 'நீங்கள் யார்?',
    selectProfile: 'டாஷ்போர்டிற்கு தொடர உங்கள் சுயவிவரத்தை தேர்ந்தெடுக்கவும்.',
    publicUser: 'பொது பயனர்',
    publicDesc: 'குற்றங்களை புகாரளிக்கவும் & வளங்களை அணுகவும்',
    cyberOfficial: 'சைபர் அதிகாரி',
    cyberDesc: 'புகார்களை விசாரித்து வழக்குகளை நிர்வகிக்கவும்',
    appLanguage: 'செயலி மொழி: உங்கள் தாய்மொழி',

    welcomeBack: 'மீண்டும் வரவேற்கிறோம்',
    secureAccess: 'பாதுகாப்பான அணுகல்',
    loginToPublic: 'உங்கள் பொது கணக்கில் உள்நுழைக.',
    loginToOfficial: 'உங்கள் அதிகாரியின் கணக்கில் உள்நுழைக.',
    fullName: 'முழு பெயர்',
    emailAddress: 'மின்னஞ்சல் முகவரி',
    password: 'கடவுச்சொல்',
    minChars: 'குறைந்தது 8 எழுத்துகள்',
    logIn: 'உள்நுழைக',
    noAccount: 'கணக்கு இல்லையா?',
    createAccount: 'கணக்கு உருவாக்கவும்',
    haveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
    orSecureWith: 'அல்லது பாதுகாப்புடன்',
    termsText: 'பதிவு செய்வதன் மூலம் நீங்கள் எங்கள் சேவை விதிமுறைகளுக்கும் தனியுரிமைக் கொள்கைக்கும் ஒப்புக்கொள்கிறீர்கள்.',
    enterLegalName: 'உங்கள் சட்டப்பூர்வ பெயரை உள்ளிடுங்கள்',

    createYourCase: 'உங்கள் வழக்கை உருவாக்கவும்',
    landingSubtitle: 'இன்றே கட்டுப்பாட்டை எடுத்து உங்கள் தனியுரிமையை பாதுகாக்கவும். எங்கள் AI அமைப்பு அங்கீகரிக்கப்படாத உள்ளடக்கத்தை அகற்ற உதவுகிறது.',
    requestDeletion: 'நீக்கம் கோரு',
    trackStatus: 'நிலையை கண்காணி',
    privacyFirst: 'தனியுரிமை முதலில்',
    privacyDesc: 'உங்கள் தரவு வங்கி அளவிலான பாதுகாப்புடன் குறியாக்கம் செய்யப்படுகிறது.',
    rapidResponse: 'விரைவான பதில்',
    rapidDesc: 'வழக்கு சரிபார்ப்பிற்கு சில நிமிடங்களில் தானியங்கி நீக்க கோரிக்கைகள் அனுப்பப்படுகின்றன.',
    legalAdvisory: 'சட்ட ஆலோசனை',
    legalDesc: 'இந்திய IT சட்டங்கள் மற்றும் சைபர் சட்டங்களுடன் சீரமைக்கப்பட்ட சட்ட வரைபடத்தை அணுகவும்.',
    whoCanUse: 'SafeHer ஐ யார் பயன்படுத்தலாம்?',
    whoCanUseDesc: 'SafeHer India என்பது சைபர் துன்புறுத்தல் மற்றும் அங்கீகரிக்கப்படாத படப்பகிர்வு பாதிக்கப்பட்டவர்களை ஆதரிக்கும் இலவச கருவியாகும்.',
    eligibility1: 'சம்மதமின்றி நெருக்கடியான படம் பயன்படுத்தப்பட்டவர்கள்',
    eligibility2: 'ஆன்லைன் துன்புறுத்தலை எதிர்கொள்பவர்கள்',
    eligibility3: 'டீப்ஃபேக் கையாளுதலை அடையாளம் காண்பவர்கள்',
    eligibility4: 'பாதுகாப்பை தேடும் சிறுமிகள் மற்றும் பெண்கள்',

    roleSelection: 'பாத்திர தேர்வு',
    startCase: 'வழக்கு தொடங்கவும்',
    monitorCases: 'வழக்குகளை கண்காணி',
    myReports: 'என் புகார்கள்',
    functions: 'செயல்பாடுகள்',
    askAI: 'AI கேளுங்கள்',
    settings: 'அமைப்புகள்',
    requestDeletionNav: 'நீக்கம் கோரு',

    settingsTitle: 'அமைப்புகள்',
    darkMode: 'இருண்ட பயன்முறை',
    darkModeDesc: 'ஒளி மற்றும் இருண்ட தோற்றத்திற்கு இடையில் மாறவும்.',
    appearanceTheme: 'தோற்றம் தீம்',
    languageSetting: 'செயலி மொழி',
    languageSettingDesc: 'முழு பயன்பாட்டிற்கான மொழியை தேர்ந்தெடுக்கவும்.',
    sosConfig: 'SOS அமைப்பு',
    voiceTrigger: 'குரல் தூண்டுதல் சொற்றொடர்',
    emergencyContact: 'அவசர தொடர்பு மின்னஞ்சல்',
    saveSettings: 'அமைப்புகளை சேமி',

    dashboard: 'டாஷ்போர்ட்',
    totalCases: 'மொத்த வழக்குகள்',
    pendingCases: 'நிலுவையில் உள்ளது',
    resolvedCases: 'தீர்க்கப்பட்டது',
    recentCases: 'சமீபத்திய வழக்குகள்',
    myFiledReports: 'என் தாக்கல் செய்த புகார்கள்',
    caseId: 'வழக்கு எண்',
    trackProgress: 'முன்னேற்றத்தை கண்காணி',
    noReportsFound: 'புகார்கள் கிடைக்கவில்லை',
    noReportsDesc: 'நீங்கள் இன்னும் எந்த சைபர் குற்றப் புகாரையும் தாக்கல் செய்யவில்லை.',
    fileAReport: 'புகார் தாக்கல் செய்யவும்',
    loadingHistory: 'வரலாறு ஏற்றுகிறது...',

    reportAnIncident: 'சம்பவத்தை புகாரளிக்கவும்',
    step1of4: 'படி 1 / 4',
    step2of4: 'படி 2 / 4',
    complete25: '25% முடிந்தது',
    wherePlatform: 'இது எங்கு நடந்தது?',
    selectAllPlatforms: 'சம்பவம் நடந்த அனைத்து தளங்களையும் தேர்ந்தெடுக்கவும்.',
    otherPlatform: 'வேறு தளம்',
    incidentCategory: 'சம்பவ வகை',
    whatTypeCrime: 'நீங்கள் என்ன வகையான சைபர் குற்றத்தை புகாரளிக்கிறீர்கள்?',
    selectCategory: 'வகையை தேர்ந்தெடுக்கவும்',
    financialFraud: 'நிதி மோசடி / ஆன்லைன் மோசடி',
    cyberBullying: 'சைபர் மிரட்டல் / துன்புறுத்தல்',
    identityTheft: 'அடையாள திருட்டு / ஆள்மாறாட்டம்',
    hacking: 'ஹேக்கிங் / அங்கீகரிக்கப்படாத அணுகல்',
    childSafety: 'குழந்தை பாதுகாப்பு சம்பந்தமான',
    misleadingContent: 'தவறான உள்ளடக்கம் / போலி செய்திகள்',
    uploadEvidence: 'சான்று பதிவேற்றவும்',
    attachFiles: 'திரைக்காட்சிகள், அரட்டை பதிவுகள் அல்லது ஆவணங்களை இணைக்கவும்.',
    tapToUpload: 'கோப்புகளை பதிவேற்ற தட்டவும்',
    fileTypes: 'JPG, PNG, PDF, அல்லது MP4 (அதிகபட்சம் 20MB)',
    noEvidence: 'இன்னும் சான்று பதிவேற்றப்படவில்லை',
    uploadingEvidence: 'சான்று பதிவேற்றுகிறது...',
    continueToDetails: 'விவரங்களுக்கு தொடரவும்',

    complaintRegistration: 'புகார் பதிவு',
    incidentParties: 'சம்பவம் & தரப்பினர்',
    incidentPartiesDesc: 'சம்பவம் மற்றும் சம்பந்தப்பட்டவர்களைப் பற்றிய சரியான விவரங்களை வழங்கவும்.',
    incidentDetails: 'சம்பவ விவரங்கள்',
    shortIncidentDesc: 'சம்பவ சுருக்க விவரம்',
    briefDescPlaceholder: 'என்ன நடந்தது, எப்போது, எப்படி என்று சுருக்கமாக விவரிக்கவும்...',
    thisFieldRequired: 'இந்த புலம் கட்டாயம் தேவை',
    incidentLinks: 'சம்பவ இணைப்புகள்',
    incidentLinksDesc: 'ஒவ்வொரு தளத்திலும் சுயவிவரம் அல்லது பதிவிற்கான URL ஐ வழங்கவும்.',
    suspectedAccused: 'சந்தேக குற்றவாளி',
    suspectNameAlias: 'சந்தேக நபர் பெயர் / புனைப்பெயர்',
    suspectNamePlaceholder: 'எ.க. அறியப்படாதவர் அல்லது ஜான் டோ',
    victimDetails: 'பாதிக்கப்பட்டவர் விவரங்கள்',
    victimAliasLabel: 'பாதிக்கப்பட்டவர் புனைப்பெயர் / அடையாளம் (அநாமதேய)',
    victimAliasPlaceholder: 'எ.க. Victim-X அல்லது Anonymous',
    gender: 'பாலினம்',
    selectGender: 'தேர்ந்தெடு',
    male: 'ஆண்',
    female: 'பெண்',
    other: 'மற்றவை',
    ageGroup: 'வயதுக் குழு',
    relationToReporter: 'புகார்தாரருடனான உறவு',
    self: 'சுய',
    familyMember: 'குடும்பத்தினர்',
    friend: 'நண்பர்',
    legalRep: 'சட்ட பிரதிநிதி',
    continueToStep3: 'படி 3 க்கு தொடரவும்',

    liveAnalysis: 'நேரடி பகுப்பாய்வு',
    deepAnalysisProgress: 'ஆழ்ந்த பகுப்பாய்வு நடந்துகொண்டிருக்கிறது',
    deepAnalysisDesc: 'எங்கள் AI சைபர் அச்சுறுத்தல்கள் மற்றும் துன்புறுத்தல் வடிவங்களுக்காக சமர்ப்பிக்கப்பட்ட சான்றுகளை தணிக்கை செய்கிறது.',
    ocrExtraction: 'OCR பிரித்தெடுத்தல்',
    ocrDesc: 'சான்று கோப்புகளிலிருந்து உரையை படிக்கிறது மற்றும் பிரித்தெடுக்கிறது.',
    threatMapping: 'அச்சுறுத்தல் வரைபடமிடல்',
    threatDesc: 'அறியப்பட்ட அச்சுறுத்தல் தரவுத்தளங்களுடன் அடையாளங்களை குறுக்கு-சரிபார்க்கிறது.',
    aiAudit: 'AI தணிக்கை',
    aiAuditDesc: 'சம்பவத்தின் தீவிரம் மற்றும் சட்ட பொருத்தத்தை வகைப்படுத்துகிறது.',

    footerText: 'SafeHer India அதிகாரப்பூர்வம்',
    footerSubtext: '© 2026 SafeHer. அரசாங்க இணக்கம். பாதுகாப்பானது. இலவசம்.',
};

const hi: Translations = {
    appName: 'SafeHer India',
    tagline: 'डर से आज़ादी तक — हर माँ की रक्षा करें। हर लड़की को सशक्त बनाएं।',
    getStarted: 'शुरू करें',
    helpCenter: 'सहायता केंद्र',
    language: 'हिंदी',
    back: 'वापस',
    continueBtn: 'जारी रखें',
    submitBtn: 'जमा करें',
    previous: 'पिछला',
    optional: 'वैकल्पिक',
    required: 'आवश्यक',
    loading: 'लोड हो रहा है...',
    signOut: 'साइन आउट',
    signOutDesc: 'आपको होम पेज पर पुनः निर्देशित किया जाएगा।',

    whoAreYou: 'आप कौन हैं?',
    selectProfile: 'डैशबोर्ड पर जाने के लिए अपनी प्रोफ़ाइल चुनें।',
    publicUser: 'सार्वजनिक उपयोगकर्ता',
    publicDesc: 'अपराधों की रिपोर्ट करें और संसाधनों तक पहुँचें',
    cyberOfficial: 'साइबर अधिकारी',
    cyberDesc: 'रिपोर्टों की जाँच करें और मामलों का प्रबंधन करें',
    appLanguage: 'ऐप भाषा: आपकी मातृभाषा',

    welcomeBack: 'वापस स्वागत है',
    secureAccess: 'सुरक्षित पहुँच',
    loginToPublic: 'अपने सार्वजनिक खाते में लॉग इन करें।',
    loginToOfficial: 'अपने आधिकारिक खाते में लॉग इन करें।',
    fullName: 'पूरा नाम',
    emailAddress: 'ईमेल पता',
    password: 'पासवर्ड',
    minChars: 'कम से कम 8 अक्षर',
    logIn: 'लॉग इन',
    noAccount: 'खाता नहीं है?',
    createAccount: 'खाता बनाएं',
    haveAccount: 'पहले से खाता है?',
    orSecureWith: 'या सुरक्षित करें',
    termsText: 'साइन अप करके आप हमारी सेवा शर्तों और गोपनीयता नीति से सहमत होते हैं।',
    enterLegalName: 'अपना कानूनी नाम दर्ज करें',

    createYourCase: 'अपना मामला बनाएं',
    landingSubtitle: 'आज नियंत्रण लें और अपनी गोपनीयता की रक्षा करें। हमारी AI प्रणाली अनधिकृत सामग्री को हटाने में मदद करती है।',
    requestDeletion: 'हटाने का अनुरोध करें',
    trackStatus: 'स्थिति ट्रैक करें',
    privacyFirst: 'गोपनीयता पहले',
    privacyDesc: 'आपका डेटा बैंक-स्तरीय सुरक्षा के साथ एन्क्रिप्ट किया गया है।',
    rapidResponse: 'त्वरित प्रतिक्रिया',
    rapidDesc: 'मामले के सत्यापन के कुछ मिनटों के भीतर स्वचालित निष्कासन अनुरोध भेजे जाते हैं।',
    legalAdvisory: 'कानूनी सलाह',
    legalDesc: 'भारतीय IT अधिनियमों और साइबर कानूनों के अनुरूप कानूनी मानचित्रण तक पहुँचें।',
    whoCanUse: 'SafeHer का उपयोग कौन कर सकता है?',
    whoCanUseDesc: 'SafeHer India साइबर उत्पीड़न और अनधिकृत छवि साझाकरण के पीड़ितों की सहायता के लिए एक मुफ्त उपकरण है।',
    eligibility1: 'गैर-सहमति वाली अंतरंग छवि दुरुपयोग के पीड़ित',
    eligibility2: 'ऑनलाइन उत्पीड़न का सामना करने वाले व्यक्ति',
    eligibility3: 'डीपफेक हेरफेर की पहचान करने वाले नागरिक',
    eligibility4: 'सुरक्षा चाहने वाली नाबालिग लड़कियाँ और महिलाएं',

    roleSelection: 'भूमिका चयन',
    startCase: 'मामला शुरू करें',
    monitorCases: 'मामले मॉनिटर करें',
    myReports: 'मेरी रिपोर्टें',
    functions: 'कार्य',
    askAI: 'AI से पूछें',
    settings: 'सेटिंग्स',
    requestDeletionNav: 'हटाने का अनुरोध',

    settingsTitle: 'सेटिंग्स',
    darkMode: 'डार्क मोड',
    darkModeDesc: 'हल्के और गहरे रूप के बीच स्विच करें।',
    appearanceTheme: 'रूप थीम',
    languageSetting: 'ऐप भाषा',
    languageSettingDesc: 'पूरे एप्लिकेशन के लिए भाषा चुनें।',
    sosConfig: 'SOS कॉन्फ़िगरेशन',
    voiceTrigger: 'वॉयस ट्रिगर वाक्यांश',
    emergencyContact: 'आपातकालीन संपर्क ईमेल',
    saveSettings: 'सेटिंग्स सहेजें',

    dashboard: 'डैशबोर्ड',
    totalCases: 'कुल मामले',
    pendingCases: 'लंबित',
    resolvedCases: 'हल किए गए',
    recentCases: 'हाल के मामले',
    myFiledReports: 'मेरी दर्ज रिपोर्टें',
    caseId: 'केस आईडी',
    trackProgress: 'प्रगति ट्रैक करें',
    noReportsFound: 'कोई रिपोर्ट नहीं मिली',
    noReportsDesc: 'आपने अभी तक कोई साइबर अपराध रिपोर्ट दर्ज नहीं की है।',
    fileAReport: 'रिपोर्ट दर्ज करें',
    loadingHistory: 'इतिहास लोड हो रहा है...',

    reportAnIncident: 'घटना की रिपोर्ट करें',
    step1of4: 'चरण 1 / 4',
    step2of4: 'चरण 2 / 4',
    complete25: '25% पूर्ण',
    wherePlatform: 'यह कहाँ हुआ?',
    selectAllPlatforms: 'उन सभी प्लेटफ़ॉर्म चुनें जहाँ घटना हुई।',
    otherPlatform: 'अन्य प्लेटफ़ॉर्म',
    incidentCategory: 'घटना श्रेणी',
    whatTypeCrime: 'आप किस प्रकार के साइबर अपराध की रिपोर्ट कर रहे हैं?',
    selectCategory: 'श्रेणी चुनें',
    financialFraud: 'वित्तीय धोखाधड़ी / ऑनलाइन घोटाला',
    cyberBullying: 'साइबर बुलिंग / उत्पीड़न',
    identityTheft: 'पहचान की चोरी / प्रतिरूपण',
    hacking: 'हैकिंग / अनधिकृत पहुँच',
    childSafety: 'बाल सुरक्षा से संबंधित',
    misleadingContent: 'भ्रामक सामग्री / फर्जी खबर',
    uploadEvidence: 'साक्ष्य अपलोड करें',
    attachFiles: 'स्क्रीनशॉट, चैट लॉग, या दस्तावेज़ संलग्न करें।',
    tapToUpload: 'फ़ाइलें अपलोड करने के लिए टैप करें',
    fileTypes: 'JPG, PNG, PDF, या MP4 (अधिकतम 20MB)',
    noEvidence: 'अभी तक कोई साक्ष्य अपलोड नहीं हुआ',
    uploadingEvidence: 'साक्ष्य अपलोड हो रहा है...',
    continueToDetails: 'विवरण के लिए जारी रखें',

    complaintRegistration: 'शिकायत पंजीकरण',
    incidentParties: 'घटना और पक्षकार',
    incidentPartiesDesc: 'घटना और इसमें शामिल व्यक्तियों के बारे में सटीक विवरण प्रदान करें।',
    incidentDetails: 'घटना विवरण',
    shortIncidentDesc: 'संक्षिप्त घटना विवरण',
    briefDescPlaceholder: 'संक्षेप में बताएं क्या हुआ, कब और कैसे...',
    thisFieldRequired: 'यह फ़ील्ड आवश्यक है',
    incidentLinks: 'घटना लिंक',
    incidentLinksDesc: 'प्रत्येक प्लेटफ़ॉर्म के लिए प्रोफ़ाइल या पोस्ट का URL प्रदान करें।',
    suspectedAccused: 'संदिग्ध आरोपी',
    suspectNameAlias: 'संदिग्ध का नाम / उपनाम',
    suspectNamePlaceholder: 'जैसे अज्ञात या जॉन डो',
    victimDetails: 'पीड़ित विवरण',
    victimAliasLabel: 'पीड़ित उपनाम / पहचान (अनाम)',
    victimAliasPlaceholder: 'जैसे Victim-X या Anonymous',
    gender: 'लिंग',
    selectGender: 'चुनें',
    male: 'पुरुष',
    female: 'महिला',
    other: 'अन्य',
    ageGroup: 'आयु वर्ग',
    relationToReporter: 'रिपोर्टर से संबंध',
    self: 'स्वयं',
    familyMember: 'परिवार का सदस्य',
    friend: 'मित्र',
    legalRep: 'कानूनी प्रतिनिधि',
    continueToStep3: 'चरण 3 के लिए जारी रखें',

    liveAnalysis: 'लाइव विश्लेषण',
    deepAnalysisProgress: 'गहन विश्लेषण प्रगति पर है',
    deepAnalysisDesc: 'हमारी AI साइबर खतरों और उत्पीड़न के पैटर्न के लिए सबमिट किए गए साक्ष्य का ऑडिट कर रही है।',
    ocrExtraction: 'OCR निष्कर्षण',
    ocrDesc: 'साक्ष्य फ़ाइलों से टेक्स्ट पढ़ना और निकालना।',
    threatMapping: 'खतरा मानचित्रण',
    threatDesc: 'ज्ञात खतरा डेटाबेस के साथ पहचानकर्ताओं का क्रॉस-रेफरेंस।',
    aiAudit: 'AI ऑडिट',
    aiAuditDesc: 'घटना की गंभीरता और कानूनी प्रयोज्यता वर्गीकृत करना।',

    footerText: 'SafeHer India आधिकारिक',
    footerSubtext: '© 2026 SafeHer. सरकार अनुपालन। सुरक्षित। मुफ़्त।',
};

export const translations: Record<Language, Translations> = { en, ta, hi };

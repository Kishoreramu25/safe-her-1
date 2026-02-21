export type Language = 'en' | 'ta' | 'hi';

export interface Translations {
    // Common
    appName: string;
    tagline: string;
    getStarted: string;
    helpCenter: string;
    language: string;

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
    emailAddress: string;
    password: string;
    minChars: string;
    logIn: string;
    noAccount: string;
    createAccount: string;
    haveAccount: string;
    orSecureWith: string;
    termsText: string;

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
    signOut: string;
    signOutDesc: string;

    // Dashboard
    dashboard: string;
    totalCases: string;
    pendingCases: string;
    resolvedCases: string;
    recentCases: string;

    // Report Steps
    step1Title: string;
    step1Desc: string;
    selectPlatforms: string;
    continueBtn: string;
    submitBtn: string;

    // Footer
    footerText: string;
    footerSubtext: string;
}

export const translations: Record<Language, Translations> = {
    en: {
        appName: 'SafeHer India',
        tagline: 'From Fear to Freedom — Protecting Every Mother. Empowering Every Girl.',
        getStarted: 'Get Started',
        helpCenter: 'Help Center',
        language: 'English',

        whoAreYou: 'Who are you?',
        selectProfile: 'Select your profile to continue to the dashboard.',
        publicUser: 'Public User',
        publicDesc: 'Report crimes & access resources',
        cyberOfficial: 'Cyber Official',
        cyberDesc: 'Investigate reports & manage cases',
        appLanguage: 'App Language: Your Mothertongue',

        welcomeBack: 'Welcome Back',
        secureAccess: 'Secure Access',
        loginToPublic: "Log in to your public account.",
        loginToOfficial: "Log in to your official account.",
        emailAddress: 'Email Address',
        password: 'Password',
        minChars: 'Min. 8 characters',
        logIn: 'Log In',
        noAccount: "Don't have an account?",
        createAccount: 'Create Account',
        haveAccount: 'Already have an account?',
        orSecureWith: 'Or Secure with',
        termsText: 'By signing up, you agree to our Terms of Service and Privacy Policy.',

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
        signOut: 'Sign Out',
        signOutDesc: 'You will be redirected to the home page.',
        dashboard: 'Dashboard',
        totalCases: 'Total Cases',
        pendingCases: 'Pending',
        resolvedCases: 'Resolved',
        recentCases: 'Recent Cases',

        step1Title: 'Report Details',
        step1Desc: 'Tell us what happened.',
        selectPlatforms: 'Select Platforms',
        continueBtn: 'Continue',
        submitBtn: 'Submit',

        footerText: 'SafeHer India Official',
        footerSubtext: '© 2026 SafeHer. Government Compliant. Secure. Free.',
    },

    ta: {
        appName: 'SafeHer India',
        tagline: 'பயத்தில் இருந்து சுதந்திரத்திற்கு — ஒவ்வொரு தாயையும் பாதுகாக்க. ஒவ்வொரு பெண்ணையும் வலுப்படுத்த.',
        getStarted: 'தொடங்குங்கள்',
        helpCenter: 'உதவி மையம்',
        language: 'தமிழ்',

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
        emailAddress: 'மின்னஞ்சல் முகவரி',
        password: 'கடவுச்சொல்',
        minChars: 'குறைந்தது 8 எழுத்துகள்',
        logIn: 'உள்நுழைக',
        noAccount: 'கணக்கு இல்லையா?',
        createAccount: 'கணக்கு உருவாக்கவும்',
        haveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
        orSecureWith: 'அல்லது பாதுகாப்புடன்',
        termsText: 'பதிவு செய்வதன் மூலம் நீங்கள் எங்கள் சேவை விதிமுறைகளுக்கும் தனியுரிமைக் கொள்கைக்கும் ஒப்புக்கொள்கிறீர்கள்.',

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
        signOut: 'வெளியேறு',
        signOutDesc: 'நீங்கள் முகப்பு பக்கத்திற்கு திருப்பி விடப்படுவீர்கள்.',
        dashboard: 'டாஷ்போர்ட்',
        totalCases: 'மொத்த வழக்குகள்',
        pendingCases: 'நிலுவையில் உள்ளது',
        resolvedCases: 'தீர்க்கப்பட்டது',
        recentCases: 'சமீபத்திய வழக்குகள்',

        step1Title: 'புகார் விவரங்கள்',
        step1Desc: 'என்ன நடந்தது என்று சொல்லுங்கள்.',
        selectPlatforms: 'தளங்களை தேர்ந்தெடுக்கவும்',
        continueBtn: 'தொடரவும்',
        submitBtn: 'சமர்பிக்கவும்',

        footerText: 'SafeHer India அதிகாரப்பூர்வம்',
        footerSubtext: '© 2026 SafeHer. அரசாங்க இணக்கம். பாதுகாப்பானது. இலவசம்.',
    },

    hi: {
        appName: 'SafeHer India',
        tagline: 'डर से आज़ादी तक — हर माँ की रक्षा करें। हर लड़की को सशक्त बनाएं।',
        getStarted: 'शुरू करें',
        helpCenter: 'सहायता केंद्र',
        language: 'हिंदी',

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
        emailAddress: 'ईमेल पता',
        password: 'पासवर्ड',
        minChars: 'कम से कम 8 अक्षर',
        logIn: 'लॉग इन',
        noAccount: 'खाता नहीं है?',
        createAccount: 'खाता बनाएं',
        haveAccount: 'पहले से खाता है?',
        orSecureWith: 'या सुरक्षित करें',
        termsText: 'साइन अप करके आप हमारी सेवा शर्तों और गोपनीयता नीति से सहमत होते हैं।',

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
        signOut: 'साइन आउट',
        signOutDesc: 'आपको होम पेज पर पुनः निर्देशित किया जाएगा।',
        dashboard: 'डैशबोर्ड',
        totalCases: 'कुल मामले',
        pendingCases: 'लंबित',
        resolvedCases: 'हल किए गए',
        recentCases: 'हाल के मामले',

        step1Title: 'रिपोर्ट विवरण',
        step1Desc: 'बताएं क्या हुआ।',
        selectPlatforms: 'प्लेटफ़ॉर्म चुनें',
        continueBtn: 'जारी रखें',
        submitBtn: 'जमा करें',

        footerText: 'SafeHer India आधिकारिक',
        footerSubtext: '© 2026 SafeHer. सरकार अनुपालन। सुरक्षित। मुफ़्त।',
    },
};

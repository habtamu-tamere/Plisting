// Language translations
const translations = {
    en: {
        buy: "Buy",
        rent: "Rent",
        shortlet: "Shortlet",
        post_property: "Post Property",
        login: "Login",
        signup: "Sign Up",
        no_account: "Don't have an account?",
        have_account: "Already have an account?",
        login_with_google: "Login with Google",
        login_with_facebook: "Login with Facebook",
        hero_title: "Find Your Dream Home in Ethiopia",
        hero_subtitle: "Thousands of properties for sale, rent, or short-term stays",
        search_placeholder: "Search by location, property type, etc.",
        search: "Search",
        featured_properties: "Featured Properties",
        apartments: "Apartments",
        houses: "Houses",
        villas: "Villas",
        land: "Land",
        commercial: "Commercial",
        browse_categories: "Browse Categories",
        quick_links: "Quick Links",
        company: "Company",
        about_us: "About Us",
        contact_us: "Contact Us",
        careers: "Careers",
        blog: "Blog",
        legal: "Legal",
        terms: "Terms of Service",
        privacy: "Privacy Policy",
        cookies: "Cookie Policy",
        connect: "Connect With Us",
        copyright: "© 2023 EthioProperties. All rights reserved.",
        regular_user: "Regular User",
        real_estate_developer: "Real Estate Developer",
        agent: "Agent",
        dashboard: "Dashboard",
        logout: "Logout",
        view_details: "View Details",
        no_properties: "No properties found",
        error_loading: "Error loading properties",
        subscription_required: "Subscription Required",
        developer_subscription_text: "As a real estate developer, you need an active subscription to post properties.",
        monthly_plan: "Monthly Plan",
        per_month: "/month",
        unlimited_posts: "Unlimited property posts",
        featured_listings: "Featured listings",
        priority_support: "Priority support",
        subscribe: "Subscribe",
        annual_plan: "Annual Plan",
        per_year: "/year",
        save_20: "Save 20%",
        free_featured: "1 free featured property per month",
        payment_required: "Payment Required",
        single_post_text: "To post a property, please pay the one-time listing fee.",
        per_post: "per post",
        post_validity: "Your post will be active for 30 days",
        pay_now: "Pay Now",
        choose_payment: "Choose Payment Method",
        pay_with_telebirr: "Pay with Telebirr",
        pay_with_cbebirr: "Pay with CBE Birr",
        view: "View",
        edit: "Edit",
        delete: "Delete"
    },
    am: {
        buy: "ግዢ",
        rent: "መከራየት",
        shortlet: "አጭር ጊዜ መከራየት",
        post_property: "ንብረት ለመለጠፍ",
        login: "ግባ",
        signup: "ይመዝገቡ",
        no_account: "መለያ የሎትም?",
        have_account: "ቀድሞውኑ መለያ አሎት?",
        login_with_google: "በGoogle ይግቡ",
        login_with_facebook: "በFacebook ይግቡ",
        hero_title: "በኢትዮጵያ የምትፈልጉትን ቤት ያግኙ",
        hero_subtitle: "ለመሸጥ፣ ለመከራየት እና ለአጭር ጊዜ የሚቀርቡ በሺዎች የሚቆጠሩ ንብረቶች",
        search_placeholder: "በቦታ፣ በንብረት አይነት ወዘተ ይፈልጉ",
        search: "ፈልግ",
        featured_properties: "የተለዩ ንብረቶች",
        apartments: "አፓርታማ",
        houses: "ቤቶች",
        villas: "ቢላዎች",
        land: "መሬት",
        commercial: "ንግድ",
        browse_categories: "ምድቦችን ያስሱ",
        quick_links: "ፈጣን አገናኞች",
        company: "ኩባንያ",
        about_us: "ስለ እኛ",
        contact_us: "አግኙን",
        careers: "ስራዎች",
        blog: "ብሎግ",
        legal: "ህጋዊ",
        terms: "የአገልግሎት ውሎች",
        privacy: "የግላዊነት ፖሊሲ",
        cookies: "የኩኪዎች ፖሊሲ",
        connect: "ከእኛ ጋር ይገናኙ",
        copyright: "© 2023 EthioProperties. ሁሉም መብቶች የተጠበቁ ናቸው።",
        regular_user: "መደበኛ ተጠቃሚ",
        real_estate_developer: "የሕንፃ አሠራር ኩባንያ",
        agent: "አጀንድ",
        dashboard: "ዳሽቦርድ",
        logout: "ይውጡ",
        view_details: "ዝርዝሮችን ይመልከቱ",
        no_properties: "ንብረቶች አልተገኙም",
        error_loading: "ንብረቶችን በማስገባት ላይ ስህተት ተከስቷል",
        subscription_required: "የደንበኝነት ምዝገባ ያስፈልጋል",
        developer_subscription_text: "እንደ የሕንፃ አሠራር ኩባንያ፣ ንብረቶችን ለመለጠፍ ንቁ የደንበኝነት ምዝገባ ያስፈልግዎታል።",
        monthly_plan: "ወርሃዊ እቅድ",
        per_month: "/ወር",
        unlimited_posts: "ያልተገደበ የንብረት ልጥፎች",
        featured_listings: "የተለዩ ዝርዝሮች",
        priority_support: "ቅድሚያ የሚሰጥ ድጋፍ",
        subscribe: "ይመዝገቡ",
        annual_plan: "አመታዊ እቅድ",
        per_year: "/አመት",
        save_20: "20% ይቆጥቡ",
        free_featured: "በወሩ አንድ ነፃ የተለየ ንብረት",
        payment_required: "ክፍያ ያስፈልጋል",
        single_post_text: "ንብረት ለመለጠፍ፣ አንድ ጊዜያዊ የምዝገባ ክፍያ ይክፈሉ።",
        per_post: "በአንድ ልጥፍ",
        post_validity: "ልጥፍዎ ለ30 ቀናት ንቁ ይሆናል",
        pay_now: "አሁን ይክፈሉ",
        choose_payment: "የክፍያ ዘዴ ይምረጡ",
        pay_with_telebirr: "በTelebirr ይክፈሉ",
        pay_with_cbebirr: "በCBE Birr ይክፈሉ",
        view: "ይመልከቱ",
        edit: "አርትዕ",
        delete: "ሰርዝ"
    },
    om: {
        buy: "Bituu",
        rent: "Qabaachuu",
        shortlet: "Qabaachuu yeroo gabaabaa",
        post_property: "Qabeenya dhiyeessuu",
        login: "Seenuu",
        signup: "Galmaa'uu",
        no_account: "Akkaawuntii hin qabduu?",
        have_account: "Akkaawuntii qabduu?",
        login_with_google: "Google tiin seenuu",
        login_with_facebook: "Facebook tiin seenuu",
        hero_title: "Mana keessan jettee yaadattu Itiyoophiyaa keessatti argadhaa",
        hero_title: "Mana keessan jettee yaadattu Itiyoophiyaa keessatti argadhaa",
        hero_subtitle: "Kumaatamaan qabeenya bitumsaa, qabaachuufi yeroo gabaabaa kan qabaatan",
        search_placeholder: "Bakka, gosa qabeenyaa, fi kkf irratti barbaadi",
        search: "Barbaadi",
        featured_properties: "Qabeenyawwan adda ta'an",
        apartments: "Apartimaantiin",
        houses: "Manaa",
        villas: "Villaa",
        land: "Lafa",
        commercial: "Daldalaa",
        browse_categories: "Gosoota ilaaluu",
        quick_links: "Kuusannoo dafaa",
        company: "Kompanii",
        about_us: "Waa'ee keenya",
        contact_us: "Nu qunnamuu",
        careers: "Hojiiwwan",
        blog: "Bloogii",
        legal: "Seeraa",
        terms: "Termii tajaajilaa",
        privacy: "Ilaalcha privaasii",
        cookies: "Ilaalcha kookii",
        connect: "Nu waliin mari'achuu",
        copyright: "© 2023 EthioProperties. Mirga hundi kan keessanii dha.",
        regular_user: "Fayyadamaa 'ddaa",
        real_estate_developer: "Kompanii ijaarsaa mana",
        agent: "Ajeentii",
        dashboard: "Daashboordii",
        logout: "Ba'uu",
        view_details: "Gadi fageenya ilaaluu",
        no_properties: "Qabeenyaa hin argamne",
        error_loading: "Qabeenyaa galchuudhaaf dogoggora dhagahame",
        subscription_required: "Galmaan galmaa'uu barbaachisaa dha",
        developer_subscription_text: "Akka kompanii ijaarsaa manaatti, qabeenya dhiyeessuuf galmaan galmaa'uu socho'aa qabdu.",
        monthly_plan: "Planiin ji'a",
        per_month: "/ji'a",
        unlimited_posts: "Qabeenya dhiyeessuu hin danda'amne",
        featured_listings: "Qabiyyee adda ta'an",
        priority_support: "Deeggarsa ulfaataa",
        subscribe: "Galmaa'uu",
        annual_plan: "Planiin waggaa",
        per_year: "/waggaa",
        save_20: "20% qusadhuu",
        free_featured: "Qabeenya adda ta'e tokko ji'atti bilisaa",
        payment_required: "Kaffaltii barbaachisaa dha",
        single_post_text: "Qabeenya dhiyeessuuf, kaffaltii dhiyeessuu tokko tokkicha galii.",
        per_post: "postii tokko",
        post_validity: "Postiin keessan guyyaa 30tti socho'aa ta'a",
        pay_now: "Amma galii",
        choose_payment: "Karaa kaffaltii filadhuu",
        pay_with_telebirr: "Telebirr tiin galii galchuu",
        pay_with_cbebirr: "CBE Birr tiin galii galchuu",
        view: "Ilaaluu",
        edit: "Gargaarsuu",
        delete: "Haquu"
    }
};

// Initialize language
function initLanguage() {
    // Set default language
    let language = localStorage.getItem('language') || 'en';
    setLanguage(language);
    
    // Add event listeners to language buttons
    document.getElementById('en-lang').addEventListener('click', () => setLanguage('en'));
    document.getElementById('am-lang').addEventListener('click', () => setLanguage('am'));
    document.getElementById('om-lang').addEventListener('click', () => setLanguage('om'));
}

// Set language
function setLanguage(language) {
    // Save to localStorage
    localStorage.setItem('language', language);
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = language;
    
    // Update active language button
    document.querySelectorAll('.language-selector button').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(`${language}-lang`).classList.add('active');
}

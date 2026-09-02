export type Language = "am" | "en";

export const translations = {
  am: {
    // Navigation
    nav: {
      home: "መነሻ",
      kircha: "ቅርጫ",
      orders: "ትዛዝ",
      profile: "መገለጫ",
    },

    // Common
    common: {
      seeAll: "ሁሉንም እይ",
      etb: "ብር",
      photos: "ፎቶዎች",
      back: "ተመለስ",
      clear: "አጽዳ",
      free: "ነጻ",
      save: "አስቀምጥ",
      cancel: "ተመለስ",
      close: "ዝጋ",
      freshFarm: "ትኩስ እርሻ",
      amboFarm: "አምቦ እርሻ",
      units: "መደብ",
    },

    // Home Page
    home: {
      greeting: "ሰላም!",
      kirchaSectionTitle: "ቅርጫ",
      otherProductsTitle: "ሌሎች ምርቶች",
      banner1Headline: "ጥራት መለያችን ነው !",
      banner1Badge1: "ተመጣጣኝ ዋጋ",
      banner1Badge2: "የተሻለ ጥራት",
      banner2Headline: "የበዓል ቅርጫ ዝግጅት !",
      banner2Badge1: "100% ጤናማ",
      banner2Badge2: "ቀጥታ ከእርሻ",
      banner3Headline: "ትኩስ የወተትና የእንቁላል ምርቶች",
      banner3Badge1: "በየቀኑ ትኩስ",
      banner3Badge2: "አምቦ እርሻ",
    },

    // Animals
    animals: {
      ox: "በሬ",
      sheep: "በግ",
      goat: "ፍየል",
      oxTitle: "የበሬ ቅርጫ",
      sheepTitle: "የበግ ቅርጫ",
      goatTitle: "የፍየል ቅርጫ",
    },

    // Kircha Portions & Listings
    portions: {
      full: "ሙሉ መደብ",
      half: "ግማሽ መደብ",
      quarter: "ሩብ መደብ",
      fullShort: "ሙሉ መደብ",
      halfShort: "ግማሽ መደብ",
      quarterShort: "ሩብ መደብ",
    },
    kircha: {
      sharesCount: "የተያዘ የመደብ ብዛት",
      slaughterDate: "የእርድ ቀን",
      almostFull: "ሊጠናቀቅ የቀረበ",
      reserveUnit: "መደብ ይያዙ",
      reserveWithDeposit: "በቅድመ ክፍያ ይያዙ",
      selectShares: "የመደብ ብዛት ይምረጡ (በ 1/4 ጭማሪ)",
      depositDueNow: "አሁን የሚከፈል ቅድመ ክፍያ (30%)",
      totalSellingPrice: "ጠቅላላ ዋጋ",
      remainingAtPickup: "በእርድ ቀን የሚከፈል ቀሪ ክፍያ",
      pickupLocation: "የመቀበያ ቦታ",
      allPhotos: "ሁሉም ፎቶዎች",
      reservationSuccess: "ቅርጫው በተሳካ ሁኔታ ተይዟል!",
      reservationSuccessMsg:
        "የ30% ቅድመ ክፍያዎ ተመዝግቧል። በእርድ ቀን ከአምቦ እርሻችን መረከብ ይችላሉ።",
      viewInOrders: "በትዕዛዞች ውስጥ እይ",
      perKircha: "ብር / ቅርጫ",
      kirchaUnit: "የቅርጫ መደብ",
    },

    // Farm Shop & Cart
    shop: {
      title: "ሌሎች ምርቶች",
      all: "ሁሉም",
      dairy: "ወተትና እርጎ",
      eggs: "እንቁላል",
      poultry: "ዶሮ",
      cartTitle: "የግዢ ቅርጫት",
      viewCart: "ቅርጫቱን እይ",
      totalCart: "ጠቅላላ ቅርጫት",
      emptyCartTitle: "የግዢ ቅርጫትዎ ባዶ ነው",
      emptyCartDesc: "በአምቦ እርሻችን የተመረቱ ትኩስ የወተት፣ የእንቁላልና የዶሮ ምርቶችን ይዘዙ።",
      browseShop: "ምርቶችን ይዩ",
      pickupSpot: "የመቀበያ ቦታ",
      itemsSubtotal: "የምርቶች ድምር:",
      pickupFee: "የመቀበያ ክፍያ:",
      totalPayment: "ጠቅላላ ክፍያ:",
      payWithChapa: "በቻፓ ሙሉ ክፍያ ፈጽም",
      orderSuccessTitle: "ትዕዛዝዎ በተሳካ ሁኔታ ተልኳል!",
      orderSuccessMsg: "የትዕዛዝዎ ክፍያ ተረጋግጧል። ከአምቦ ፎንዲ እርሻ መረከብ ይችላሉ።",
    },

    // Orders
    orders: {
      title: "ትዛዝ",
      kirchaTab: "የቅርጫ ትዕዛዞች",
      shopTab: "ሌሎች ምርቶች ትዛዝ",
      statusBalanceDue: "ቀሪ ክፍያ ያለበት",
      statusPaid: "ሙሉ የተከፈለ",
      statusReady: "ለመረከብ ዝግጁ",
      statusCollected: "ተረክበዋል",
      tagId: "መለያ ቁጥር:",
      depositPaid: "የተከፈለ ቅድመ ክፍያ:",
      balanceRemaining: "ቀሪ ክፍያ:",
      slaughterDate: "የእርድ ቀን:",
      viewDetails: "ዝርዝር እይ",
      payBalance: "ቀሪ ክፍያ ፈጽም",
      emptyKirchaOrders: "እስካሁን ምንም የቅርጫ ትዕዛዝ የለም።",
      emptyShopOrders: "እስካሁን ምንም የሱቅ ትዕዛዝ የለም።",
    },

    // Profile
    profile: {
      title: "መገለጫ",
      telegramUser: "የቴሌግራም ተጠቃሚ",
      phoneNumber: "ስልክ ቁጥር",
      editPhone: "ስልክ ቀይር",
      savePhone: "ስልክ አስቀምጥ",
      enterPhone: "ስልክ ቁጥር ያስገቡ (+251...)",
      language: "ቋንቋ / Language",
      selectLanguage: "የመተግበሪያውን ቋንቋ ይምረጡ",
      english: "English (US)",
      amharic: "አማርኛ (Amharic)",
      pickupInfoTitle: "ዋና የመቀበያ ቦታ",
      pickupInfoDesc: "ፎንዲ እርሻ አምቦ ማዕከል፣ ኦሮሚያ፣ ኢትዮጵያ",
      support: "የደንበኞች አገልግሎት (ቴሌግራም)",
      terms: "የአገልግሎት ደንቦችና መመሪያዎች",
      appVersion: "ፎንዲ እርሻ ሚኒ አፕ v1.0.0 (አምቦ፣ ኢትዮጵያ)",
    },
  },

  en: {
    // Navigation
    nav: {
      home: "Home",
      kircha: "Kircha",
      orders: "Orders",
      profile: "Profile",
    },

    // Common
    common: {
      seeAll: "See all",
      etb: "ETB",
      photos: "photos",
      back: "Back",
      clear: "Clear",
      free: "FREE",
      save: "Save",
      cancel: "Cancel",
      close: "Close",
      freshFarm: "Fresh Farm",
      amboFarm: "Ambo Farm",
      units: "Units",
    },

    // Home Page
    home: {
      greeting: "Hello!",
      kirchaSectionTitle: "Kircha Cattle",
      otherProductsTitle: "Other Farm Products",
      banner1Headline: "Quality is our hallmark!",
      banner1Badge1: "Affordable Price",
      banner1Badge2: "Superior Quality",
      banner2Headline: "Holiday Kircha Preparation!",
      banner2Badge1: "100% Healthy",
      banner2Badge2: "Direct from Farm",
      banner3Headline: "Fresh Dairy & Organic Eggs",
      banner3Badge1: "Daily Fresh",
      banner3Badge2: "Ambo Farm",
    },

    // Animals
    animals: {
      ox: "Ox",
      sheep: "Sheep",
      goat: "Goat",
      oxTitle: "Ox Kircha",
      sheepTitle: "Sheep Kircha",
      goatTitle: "Goat Kircha",
    },

    // Kircha Portions & Listings
    portions: {
      full: "Full Share (1.0)",
      half: "Half Share (0.5)",
      quarter: "Quarter Share (0.25)",
      fullShort: "Full Share",
      halfShort: "Half Share",
      quarterShort: "Quarter Share",
    },
    kircha: {
      sharesCount: "Reserved Shares",
      slaughterDate: "Slaughter Date",
      almostFull: "Almost Full",
      reserveUnit: "Reserve Unit",
      reserveWithDeposit: "Reserve with Deposit",
      selectShares: "Select Your Portions (¼ increments)",
      depositDueNow: "Deposit Due Now (30%)",
      totalSellingPrice: "Total Selling Price",
      remainingAtPickup: "Remaining Balance (At Pickup)",
      pickupLocation: "Pickup Location",
      allPhotos: "All Photos",
      reservationSuccess: "Kircha Reserved Successfully!",
      reservationSuccessMsg:
        "Your 30% deposit has been registered. You can collect your beef at Fondi Farms Ambo on slaughter day.",
      viewInOrders: "View in Orders",
      perKircha: "ETB / Kircha",
      kirchaUnit: "KIRCHA UNIT",
    },

    // Farm Shop & Cart
    shop: {
      title: "Farm Shop Products",
      all: "All",
      dairy: "Milk & Yogurt",
      eggs: "Eggs",
      poultry: "Poultry",
      cartTitle: "Shopping Cart",
      viewCart: "View Cart",
      totalCart: "Total Cart",
      emptyCartTitle: "Your cart is empty",
      emptyCartDesc:
        "Explore fresh dairy, eggs, and poultry products produced at our Ambo farm.",
      browseShop: "Browse Farm Shop",
      pickupSpot: "Designated Pickup Spot",
      itemsSubtotal: "Items Subtotal:",
      pickupFee: "Pickup Fee:",
      totalPayment: "Total Payment:",
      payWithChapa: "Pay Full Amount with Chapa",
      orderSuccessTitle: "Order Placed Successfully!",
      orderSuccessMsg:
        "Your shop order is confirmed for collection at Fondi Farms Ambo.",
    },

    // Orders
    orders: {
      title: "My Orders",
      kirchaTab: "Kircha Reservations",
      shopTab: "Farm Shop Orders",
      statusBalanceDue: "BALANCE DUE",
      statusPaid: "PAID",
      statusReady: "READY FOR PICKUP",
      statusCollected: "COLLECTED",
      tagId: "Tag ID:",
      depositPaid: "Deposit Paid:",
      balanceRemaining: "Balance Remaining:",
      slaughterDate: "Slaughter Date:",
      viewDetails: "View Details",
      payBalance: "Pay Remaining Balance",
      emptyKirchaOrders: "No active Kircha reservations yet.",
      emptyShopOrders: "No active shop orders yet.",
    },

    // Profile
    profile: {
      title: "My Profile",
      telegramUser: "Telegram Verified Customer",
      phoneNumber: "Phone Number",
      editPhone: "Edit Phone",
      savePhone: "Save Phone",
      enterPhone: "Enter phone number (+251...)",
      language: "Language / ቋንቋ",
      selectLanguage: "Choose App Language",
      english: "English (US)",
      amharic: "አማርኛ (Amharic)",
      pickupInfoTitle: "Default Pickup Location",
      pickupInfoDesc: "Fondi Farms Ambo Center, Oromia, Ethiopia",
      support: "Customer Support (Telegram)",
      terms: "Terms of Service & Animal Welfare",
      appVersion: "Fondi Farms Mini App v1.0.0 (Ambo, Ethiopia)",
    },
  },
};

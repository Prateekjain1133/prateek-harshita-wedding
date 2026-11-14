// ===== EDIT EVERYTHING HERE =====
// Photos: drop files in /public/images and set the path (e.g. '/images/couple.jpg').
// Leave '' to show an elegant placeholder. Tip: open the site with ?edit to upload photos from the browser (saved on that device only).
export const wedding = {
  groom: 'Prateek', bride: 'Harshita',
  // Instagram usernames (enter handles without @; links are built automatically).
  social: { groom: '__pratik_jain__', bride: 'drx.harshu_jain2816', couple: 'prashita__diaries', photographer: 'pawan_fotowala' },
  websiteCredit: { name: 'Prateek Jain', phone: '8823869495' },
  greeting: '॥ श्री महावीराय नमः ॥', title: 'The Wedding Affair', family: '',
  dateLabel: '11 December 2026', dayLabel: 'Friday',
  countdownTarget: '2026-12-11T10:00:00+05:30',
  afterMessage: 'The Wedding Affair की मंगलमय स्मृतियाँ',
  invitation: {
    heading: 'With Love & Blessings ❤️',
   
  },
  invitationEn: 'With the divine blessings of Lord Jinendra and the love and good wishes of all of you, a joyous wedding celebration has come to our family. We warmly request the gracious presence of you and your family at the auspicious ceremonies.',
  afterMessageEn: 'Cherished memories of a blessed wedding',
  closing: { en: 'Your gracious presence and blessings will mean the world to us. With warm regards.', signoff: 'With Love, Prateek ❤️ Harshita' },
images: {
  // Pre-wedding portraits: place these files inside public/images/.
  couple: '/images/prewedding-01.jpg',
  groom: '/images/groom.jpg',
  bride: '/images/bride.jpg',
  venue: '',
  mahavir: '/images/mahavir.jpg',
},
  video: { src: '/video/wedding-invite.mp4', poster: '/video/poster.jpg' },
  music: { src: '/audio/wedding-instrumental.mp3' },
  story: [
    { date: 'A Beautiful Beginning', title: 'Two families, one celebration', text: 'With the blessings of our elders and the grace of Jinendra Bhagwan, two families come together to celebrate this auspicious occasion.' },
    { date: 'A New Chapter', title: 'Prateek & Harshita', text: 'A new journey begins with love, respect, shared dreams and the blessings of everyone dear to us.' },
    { date: '11 December 2026', title: 'The Wedding Day', text: 'We look forward to celebrating this special day with you. Your presence and blessings will make it even more memorable.' }
  ],
  venue: {
    name: 'Radharani Marrige garden', address: 'Susner road, Modi, Madhya Pradesh 465447',
    // Exact coordinates resolved from the user's Google Maps pin:
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=23.996436%2C76.200344',
    embedUrl: 'https://maps.google.com/maps?q=23.996436%2C76.200344&z=16&output=embed',
  },
gallery: [
  { src: '/images/prewedding-01.jpg', label: 'A Moment to Remember' },
  { src: '/images/prewedding-02.jpg', label: 'Together by the Lake' },
  { src: '/images/prewedding-03.jpg', label: 'A Quiet Forever' },
  { src: '/images/prewedding-04.jpg', label: 'A Royal Frame' },
],
  events: [
    { date: '7 December 2026', day: 'सोमवार', dayEn: 'Monday', items: [['08:00 AM', 'विधान', 'Vidhaan'], ['07:00 PM', 'ज्वारा बाना', 'Jwara Bana']] },
    { date: '8 December 2026', day: 'मंगलवार', dayEn: 'Tuesday', items: [['07:00 PM', 'मेहंदी', 'Mehndi']] },
    { date: '9 December 2026', day: 'बुधवार', dayEn: 'Wednesday', items: [['12:30 PM', 'हल्दी', 'Haldi']] },
    { date: '10 December 2026', day: 'गुरुवार', dayEn: 'Thursday', items: [['01:00 PM', 'जिनेंद्र दर्शन', 'Jinendra Darshan'], ['03:00 PM', 'मोसारा', 'Mosara'], ['08:00 PM', 'भक्तामर पाठ', 'Bhaktamar Path']] },
    { date: '11 December 2026', day: 'शुक्रवार', dayEn: 'Friday', main: true, items: [['10:00 AM', 'बारात', 'Baraat'], ['12:30 PM', 'तोरण', 'Toran'], ['02:00 PM', 'परिग्रहण संस्कार', 'Parigrahan Sanskar'], ['04:00 PM', 'आशीर्वाद समारोह एवं माधुर्य भोज (सूर्यास्त पूर्व तक)', 'Blessing Ceremony & Wedding Feast (before sunset)']] },
  ],
};